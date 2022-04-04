import { table, getMinifiedRecords } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  //find coffee store
  try {
    if (req.method === "POST") {
      const { ID, name, address, neighborhood, voting, imgUrl } = req.body;
      if (ID) {
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id=${ID}`,
          })
          .firstPage();

        //if there is a coffee store with that ID, return it.
        if (findCoffeeStoreRecords.length !== 0) {
          const records = getMinifiedRecords(findCoffeeStoreRecords);
          res.json(records);
        } else {
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  ID,
                  name,
                  address,
                  neighborhood,
                  voting,
                  imgUrl,
                },
              },
            ]);
            const records = getMinifiedRecords(createRecords);
            res.json(records);
          } else {
            res.status(400);
            res.json({ message: "Name is missing." });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "Missing ID" });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500);
    res.json("Ups, something went wrong. We cant create or find that store.");
  }
};

export default createCoffeeStore;
