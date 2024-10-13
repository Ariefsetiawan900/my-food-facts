export const formatKey = (key: string) => {
  return key.replace(/[-_]/g, ' ');
};

export const getTextColorNovaGroupColor = (name: string) => {
  switch (name.toLowerCase()) {
    case 'en:1-unprocessed-or-minimally-processed-foods':
      return 'success';
    case 'en:2-processed-culinary-ingredients ':
      return 'warning';
    case 'en:4-ultra-processed-food-and-drink-products':
      return 'failure';
    default:
      return '';
  }
};

export const isValidInput = (text: string, min = 5, max = 50) => {
  return text.length >= min && text.length <= max;
};
