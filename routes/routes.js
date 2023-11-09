export default function shoeApiRoutes(shoeQuery) {

    async function allShoesRoutes(req, res) {
      try {
        const result = await shoeQuery.getAllShoes();
        return res.json(result);
      } catch (error) {
        console.error('Error in allShoesRoutes:', error);
        res.status(500).send('Internal Server Error');
      }
    }

    async function filterBrand(req, res) {
        try {   
             const brandName = req.params.brandname;
          const result = await shoeQuery.getShoesByBrand(brandName);
          return res.json(result);
        } catch (error) {
          console.error('Error in allShoesRoutes:', error);
          res.status(500).send('Internal Server Error');
        }
      }

      async function filterSize(req, res) {
        try {   
            const shoeSize = req.params.size;
          const result = await shoeQuery.getShoesBySize(shoeSize);
          return res.json(result);
        } catch (error) {
          console.error('Error in allShoesRoutes:', error);
          res.status(500).send('Internal Server Error');
        }
      }

      async function filterBrandAndSize(req, res) {
        try {   
            const brandName = req.params.brandname;
            const shoeSize = req.params.size;
          const result = await shoeQuery.getShoesByBrandAndSize(brandName,shoeSize);
          return res.json(result);
        } catch (error) {
          console.error('Error in allShoesRoutes:', error);
          res.status(500).send('Internal Server Error');
        }
      }

  
    return {
      allShoesRoutes,
      filterBrand,
      filterSize,
      filterBrandAndSize
    };
  }