class LocalStorageService {
    /**
     * Stores data in localStorage.
     * @param key - The key under which the data will be stored.
     * @param data - The data to store. It will be stringified.
     */
    static setItem<T>(key: string, data: T): void {
      try {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
      } catch (error) {
        console.error(`Error storing data in localStorage with key "${key}":`, error);
      }
    }
  
    /**
     * Retrieves data from localStorage.
     * @param key - The key to retrieve the data from.
     * @returns The parsed data if it exists, otherwise `null`.
     */
    static getItem<T>(key: string): T | null {
      try {
        const jsonData = localStorage.getItem(key);
        return jsonData ? JSON.parse(jsonData) : null;
      } catch (error) {
        console.error(`Error retrieving data from localStorage with key "${key}":`, error);
        return null;
      }
    }
  
    /**
     * Clears data from localStorage for a specific key.
     * @param key - The key to clear from localStorage.
     */
    static removeItem(key: string): void {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing data from localStorage with key "${key}":`, error);
      }
    }
  }
  
  export default LocalStorageService;
  