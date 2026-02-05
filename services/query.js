// export default function shoeApiQuery(db) {

//   async function getAllShoes() {

//     const result = await db.any('SELECT * FROM shoes');
//     return result;
//   }

//   async function getShoesByBrand(brandName) {
//     try {
//       const result = await db.many('SELECT * FROM shoes WHERE brand = $1', brandName);
//       return result;
//     } catch (error) {
//       console.error('Error fetching shoes by brand:', error);
//       throw error;
//     }
//   }

//   async function getShoesBySize(shoeSize) {
//     try {
//       const result = await db.any('SELECT * FROM shoes WHERE size = $1', shoeSize);
//       return result;
//     } catch (error) {
//       console.error('Error fetching shoes by brand:', error);
//       throw error;
//     }
//   }
//   async function getShoesByColor(shoeColor) {
//     try {
//       const result = await db.any('SELECT * FROM shoes WHERE color = $1', shoeColor);
//       return result;
//     } catch (error) {
//       console.error('Error fetching shoes by brand:', error);
//       throw error;
//     }
//   }


//   async function getShoesByBrandAndSize(brandName, shoeSize) {
//     try {
//       const result = await db.any('SELECT * FROM shoes WHERE brand = $1 AND size = $2', [brandName, shoeSize]);
//       return result;
//     } catch (error) {
//       console.error('Error fetching shoes by brand, size, and color:', error);
//       throw error;
//     }
//   }

//   async function getShoesByBrandAndColor(brandName, shoeColor) {
//     try {
//       const result = await db.any('SELECT * FROM shoes WHERE brand = $1 AND color = $2', [brandName, shoeColor]);
//       return result;
//     } catch (error) {
//       console.error('Error fetching shoes by brand, size, and color:', error);
//       throw error;
//     }
//   }



//   async function getShoesBySizeAndColor(shoeSize, shoeColor) {
//     try {
//       const result = await db.any('SELECT * FROM shoes WHERE size = $1 AND color = $2', [shoeSize, shoeColor]);
//       return result;
//     } catch (error) {
//       console.error('Error fetching shoes by brand, size, and color:', error);
//       throw error;
//     }
//   }

//   async function getShoesByBrandAndSizeAndColor(brandName,shoeSize, shoeColor) {
//     try {
//       const result = await db.any('SELECT * FROM shoes WHERE brand = $1 AND size = $2 AND color = $3', [brandName,shoeSize, shoeColor]);
//       return result;
//     } catch (error) {
//       console.error('Error fetching shoes by brand, size, and color:', error);
//       throw error;
//     }
//   }

  
  
//   async function addShoeToStock(shoeInfo) {
//     const query = 'INSERT INTO shoes(color, brand, price, size, in_stock, image_url) VALUES($1, $2, $3, $4, $5, $6)';
//     await db.none(query, shoeInfo);
//   }




//   return {
//     getAllShoes,
//     getShoesByBrand,
//     getShoesBySize,
//     getShoesByColor,
//     getShoesByBrandAndSize,
//     getShoesByBrandAndColor,
//     getShoesBySizeAndColor,
//     getShoesByBrandAndSizeAndColor,
//     addShoeToStock
//   }

// }
import db from './db.js';

export default function shoeApiQuery() {
  return {
    getAllShoes: () => db.any('SELECT * FROM shoes'),
    getShoesByBrand: (brand) => db.any('SELECT * FROM shoes WHERE brand = $1', [brand]),
    getShoesBySize: (size) => db.any('SELECT * FROM shoes WHERE size = $1', [size]),
    getShoesByColor: (color) => db.any('SELECT * FROM shoes WHERE color = $1', [color]),
    getShoesByBrandAndSize: (brand, size) =>
      db.any('SELECT * FROM shoes WHERE brand = $1 AND size = $2', [brand, size]),
    getShoesByBrandAndColor: (brand, color) =>
      db.any('SELECT * FROM shoes WHERE brand = $1 AND color = $2', [brand, color]),
    getShoesBySizeAndColor: (size, color) =>
      db.any('SELECT * FROM shoes WHERE size = $1 AND color = $2', [size, color]),
    getShoesByBrandAndSizeAndColor: (brand, size, color) =>
      db.any('SELECT * FROM shoes WHERE brand = $1 AND size = $2 AND color = $3', [brand, size, color]),
    addShoeToStock: ([color, brand, price, size, in_stock, image_url]) =>
      db.none(
        'INSERT INTO shoes(color, brand, price, size, in_stock, image_url) VALUES($1,$2,$3,$4,$5,$6)',
        [color, brand, price, size, in_stock, image_url]
      ),
  };
}
