export const transformSnakeToCamel = (data: any) => {
    const transformedData: any = {};
    
    Object.keys(data).forEach(key => {
      const camelKey = key.replace(/(_\w)/g, match => match[1].toUpperCase());
      transformedData[camelKey] = data[key];
    });
  
    return transformedData;
  };
  