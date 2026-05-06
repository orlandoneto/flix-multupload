import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { useUserDataCache } from './useUserDataCache';
import { SubscriptionService } from '~/services';

export const useUserData = () => {
  const { getByUserId } = useAuth();
  const user: User = useUserDataCache();
  const [userAvatar, setUserAvatar] = useState<string | undefined>(user?.photo || undefined);
  const [planUser, setPlanUser] = useState<UserPlan | undefined>();
  const [userContributor, setUserContributor] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User>();
  const subscriptionService = new SubscriptionService();

  const IS_CONTRIBUTOR = 1;

  useEffect(() => {
    const fetchUserAvatar = async () => {
      try {
        if (user && user.photo) {
          setUserAvatar(user.photo);
        } else if (user && user.id) {
          const result = await getByUserId(user.id);
          if (result && result.photo) {
            setUserAvatar(result.photo);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar a foto do usuário', error);
      }
    };

    fetchUserAvatar();
  }, [user, getByUserId]);

  const handleGetContributor = async () => {
    try {
      if (user && user.contributor === IS_CONTRIBUTOR) {
        setUserContributor(true);
      } else if (user && user.id) {
        const userOnline = await getByUserId(user.id);
        if (userOnline.contributor === IS_CONTRIBUTOR) {
          setUserContributor(true);
        }
      } else {
        setUserContributor(false);
      }
    } catch (error) {
      console.error('Erro ao buscar a contribuidor', error);
    }
  };

  //FIXME: Transformar em um hook
  // Busca o plano do usuário
  const handleGetPlan = async () => {
    if (user && user.id) {
      try {
        const response: UserPlanResponse = await subscriptionService.getUserPlanGrouped(user.id);

        if (response.data && response.data.length > 0) {
          setPlanUser(response.data[0]);
        } else {
          setPlanUser(undefined);
        }
      } catch (error) {
        console.error('Erro ao buscar o plano do usuário:', error);
      }
    }
  };

  const handleGetUser = async () => {
    try {
      if (user && user.id) {
        const userData = await getByUserId(user.id);
        if (userData) {
          setCurrentUser(userData);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar a foto do usuário', error);
    }
  };

  useEffect(() => {
    handleGetUser();
    handleGetPlan();
    handleGetContributor();
  }, [user]);

  return { userAvatar, planUser, userContributor, currentUser };
};
