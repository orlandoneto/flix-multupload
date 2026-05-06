import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { UserCommissionsService } from '~/services';
import {
  AreaChartContainer,
  BalanceContainer,
  Button,
  Card,
  ChartContainer,
  Container,
} from './styles';

interface CommissionDay {
  amount: string;
  created_at: string;
}

interface Commissions {
  today: {
    total: number;
    downloads: number;
  };
  last7Days: {
    total: number;
    downloads: number;
  };
  last30Days: {
    total: number;
    downloads: number;
  };
  availableBalance: number;
  commissionsLast30Days: CommissionDay[];
  totalGeneral: number;
}

interface WalletProps {
  user: User;
  userCommissionsService: UserCommissionsService;
}

export const Wallet: React.FC<WalletProps> = ({ user, userCommissionsService }) => {
  const [commissions, setCommissions] = useState<Commissions | null>(null);

  const getUserCommissions = async (user_id: number) => {
    if (user?.id) {
      const { data } = await userCommissionsService.userCommissions(user_id);

      setCommissions(data);
    }
  };

  useEffect(() => {
    if (user?.id) getUserCommissions(user?.id);
  }, [user]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const generateChartData = () => {
    if (commissions && Array.isArray(commissions.commissionsLast30Days)) {
      // Agrupa por data (YYYY-MM-DD)
      const grouped: { [date: string]: number } = {};
      commissions.commissionsLast30Days.forEach((item: CommissionDay) => {
        const date = new Date(item.created_at);
        const key = date.toISOString().slice(0, 10);
        grouped[key] = (grouped[key] || 0) + parseFloat(item.amount);
      });

      // Ordena as datas do mais antigo para o mais recente
      return Object.entries(grouped)
        .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
        .map(([date, value]) => {
          const d = new Date(date);
          const day = d.getDate().toString().padStart(2, '0');
          const month = (d.getMonth() + 1).toString().padStart(2, '0');
          return { name: `${day}/${month}`, value };
        });
    }
    return [];
  };

  const chartData = generateChartData();

  return (
    <Container>
      <h2>Minha Carteira</h2>

      <div className="info-cards">
        <Card>
          <span>Hoje</span>
          <strong>{formatCurrency(commissions?.today.total ?? 0)}</strong>
          <small>{commissions?.today.downloads} downloads</small>
        </Card>

        <Card>
          <span>Últimos 7 dias</span>
          <strong>{formatCurrency(commissions?.last7Days.total ?? 0)}</strong>
          <small>{commissions?.last7Days.downloads} downloads</small>
        </Card>

        <Card>
          <span>Últimos 30 dias</span>
          <strong>{formatCurrency(commissions?.last30Days.total ?? 0)}</strong>
          <small>{commissions?.last30Days.downloads} downloads</small>
        </Card>
      </div>

      <AreaChartContainer>
        <ChartContainer>
          <h3>Rendimentos nos últimos 30 dias</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} barCategoryGap="60%">
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <BalanceContainer>
          <h3>Saldo disponível</h3>
          <strong>{formatCurrency(commissions?.availableBalance ?? 0)}</strong>
          <p>Mínimo para saque é de {formatCurrency(100)}</p>
          <p>
            Total pago: <strong className="total-paid">{formatCurrency(commissions?.totalGeneral ? Number(commissions.totalGeneral) : 0)}</strong>
          </p>
        </BalanceContainer>
      </AreaChartContainer>

      <Button disabled={!commissions || commissions.availableBalance < 100}>Solicitar saque</Button>
    </Container>
  );
};
