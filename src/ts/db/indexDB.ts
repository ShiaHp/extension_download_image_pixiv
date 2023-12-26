export class IndexedDBHandler {

  constructor(databaseName, objectStoreName) {
    this.databaseName = databaseName;
    this.objectStoreName = objectStoreName;
  }

  private databaseName: string = '';
  private objectStoreName: string = '';
  private db;
  openDatabase() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.databaseName, 1);

      request.onsuccess = (event) => {
        this.db = request.result;
        resolve("Database opened successfully!");
      };

      request.onerror = (event) => {
        reject(`Error opening database: ${request.error}`);
      };

      request.onupgradeneeded = (event) => {
        this.db = request.result;
        this.createObjectStore();
      };
    });
  }

  createObjectStore() {
    this.db.createObjectStore(this.objectStoreName, { keyPath: "id", autoIncrement: true });
  }

  addData(data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.objectStoreName], "readwrite");
      const objectStore = transaction.objectStore(this.objectStoreName);
      const addRequest = objectStore.add(data);

      addRequest.onsuccess = (event) => {
        resolve("Data added successfully!");
      };

      addRequest.onerror = (event) => {
        reject(`Error adding data: ${transaction.error}`);
      };
    });
  }

  deleteData(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.objectStoreName], "readwrite");
      const objectStore = transaction.objectStore(this.objectStoreName);
      const deleteRequest = objectStore.delete(id);

      deleteRequest.onsuccess = (event) => {
        resolve("Data deleted successfully!");
      };

      deleteRequest.onerror = (event) => {
        reject(`Error deleting data: ${transaction.error}`);
      };
    });
  }

  getData(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.objectStoreName], "readonly");
      const objectStore = transaction.objectStore(this.objectStoreName);
      const getRequest = objectStore.get(id);

      getRequest.onsuccess = (event) => {
        const data = transaction.result;
        if (data) {
          resolve(data);
        } else {
          reject("Data not found.");
        }
      };

      getRequest.onerror = (event) => {
        reject(`Error retrieving data: ${transaction.error}`);
      };
    });
  }

  searchData(searchTerm) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.objectStoreName], "readonly");
      const objectStore = transaction.objectStore(this.objectStoreName);
      const cursorRequest = objectStore.openCursor();

      cursorRequest.onsuccess = (event) => {
        const cursor = transaction.result;
        if (cursor) {
          const data = cursor.value;
          if (!data.checked) {
            // Process the data here (do whatever you need to do when data is not checked)
            data.checked = true;
            const updateRequest = cursor.update(data);

            updateRequest.onsuccess = () => {
              resolve(data);
            };

            updateRequest.onerror = (event) => {
              reject(`Error updating data: ${transaction.error}`);
            };
          } else {
            cursor.continue();
          }
        } else {
          resolve(null); // No unchecked data found
        }
      };

      cursorRequest.onerror = (event) => {
        reject(`Error searching data: ${transaction.error}`);
      };
    });
  }
}
