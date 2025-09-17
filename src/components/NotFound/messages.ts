import { createDictionary } from '../../utils/createDictionary';

export const messages = createDictionary('not-found', {
  title: '404',
  subtitle: 'Page Not Found',
  description: 'The page you are looking for does not exist',
  goHome: 'Go to Home',
  goBack: 'Go Back',
  errorOccurred: 'Oops! Something went wrong',
  tryAgain: 'Please try again later',
});