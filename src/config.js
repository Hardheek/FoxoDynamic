export const appConfig = {
  theme: {
    primaryColor: '#3498db',
    secondaryColor: '#2ecc71',
    textColor: '#064e3b',
    backgroundColor: '#f0f8f5',
    cardBgColor: '#ffffff',
    shadowBorderColor: '#0f9d58',
  },
  splash: {
    logo: require('./Images/foxo-logo.png'),
    backgroundColor: '#ffffff',
    animation: {
      fadeDuration: 1500,
      scaleDuration: 1500,
      initialScale: 0.7,
      finalScale: 1,
      initialOpacity: 0,
      finalOpacity: 1,
      delayBeforeNavigate: 3000,
    },
  },
  logo: require('./Images/foxo-logo.png'),
  formFields: [
    {
      key: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your name',
    },
    {
      key: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
    },
    {
      key: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter password',
    },
  ],
  buttonStyles: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#3498db',
  },
  animations: {
    screenSlideAnimation: 'fade',
    logoScale: {
      toValue: 1.2,
      duration: 1200,
    },
    buttonPressScale: 0.95,
    buttonReleaseScale: 1,
  },
};
