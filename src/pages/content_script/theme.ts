import { createTheme } from '@mui/material'
import '@fontsource/inter/variable.css'
const theme = createTheme({
  components: {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        placement: 'left',
      },
      styleOverrides: {
        tooltip: {
          backgroundColor: '#080A29',
          marginRight: '25px!important',
          marginLeft: '25px!important',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
          borderRadius: '8px',
          paddingTop: '10px',
          paddingBottom: '10px',
          paddingLeft: '15px',
          paddingRight: '15px',
        },
        arrow: {
          color: '#080A29',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
})

export default theme
