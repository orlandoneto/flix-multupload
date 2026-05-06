import { Box, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { ImageUserGallery, Section } from '~/components';
import { UploadImagesPackForm } from '~/components/Forms/UploadImagesPackForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabUploadImagePack = () => {
  const [value, setValue] = useState<number>(0);

  const labelTabListPacks = 'Envie aqui seus Arquivos';
  const labelTabCreatePack = 'Seus arquivos';

  useEffect(() => {
    const savedTab = localStorage.getItem('currentTab');
    if (savedTab) {
      setValue(parseInt(savedTab));
    }
  }, []);

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    localStorage.setItem('currentTab', newValue.toString());
  };

  return (
    <div style={{ width: '100%', padding: '20px' }}>
      <Tabs
        value={value}
        onChange={(event, newValue) => handleChange(event, newValue)}
        aria-label="simple tabs example"
        textColor="inherit"
        TabIndicatorProps={{
          style: { backgroundColor: '#ffffff' },
        }}
      >
        <Tab
          label={labelTabListPacks}
          {...a11yProps(1)}
          sx={{
            color: '#FFFFFF',
            '&.Mui-selected': {
              color: 'rgb(218, 27, 71);',
            },
            backgroundColor: '#0A1218',
            '&:hover': {
              backgroundColor: '#1A2B38',
            },
          }}
        />
        <Tab
          label={labelTabCreatePack}
          {...a11yProps(0)}
          sx={{
            color: '#FFFFFF',
            '&.Mui-selected': {
              color: 'rgb(218, 27, 71);',
            },
            backgroundColor: '#0A1218',
            '&:hover': {
              backgroundColor: '#1A2B38',
            },
          }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Section width="100%" backgroundColor="#11181D">
          <UploadImagesPackForm backgroundColor="#11181D" />
        </Section>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Section width="100%" backgroundColor="#11181D">
          <ImageUserGallery />
        </Section>
      </TabPanel>
    </div>
  );
};
