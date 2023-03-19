import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";
import express, { Request, Response } from "express";

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // define status code
  const HTTP_STATUS_OK = 200;
  const HTTP_STATUS_NOT_FOUND = 404;
  const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  app.get("/filteredimage/", async (req: Request, res: Response) => {
    const imageUrl = req.query.image_url;
    if (!imageUrl) {
      return res
        .status(HTTP_STATUS_NOT_FOUND)
        .send("Image_url parameter is required");
    }

    try {
      // Call filterImageFromURL to filter the image
      const filteredPath = await filterImageFromURL(imageUrl);

      // Send the resulting file in the response
      res.sendFile(filteredPath, {}, (err) => {
        if (err) {
          return res
            .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
            .send("Can't send file");
        }

        // Delete the file on finish of the response
        deleteLocalFiles([filteredPath]);
      });
    } catch (err) {
      return res
        .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send("Some thing was wrong, please check your server");
    }
  });
  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
