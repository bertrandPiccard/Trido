import app from "../auth/firebase";

// Example of listing
const listing = {
  title: "New sofa",
  description: "Good quality, used for 2 months",
  price: 100,
  images: [
    "file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540luxio3%252FTrido/ImagePicker/141e61ca-cd29-4414-906a-af98082d5d6a.jpg",
    "file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540luxio3%252FTrido/ImagePicker/141e61ca-cd29-4414-906a-af98082d5d6a.jpg",
  ],
  category: "Furniture",
};

//Reference to the firestore collection for the listings
const refFireStore = app.firestore().collection("listings");
//Reference to the storage for the
const refStorage = app.storage().ref("listings/");

const getListings = async () => {
  let listings = [];
  const querySnapshot = await app
    .firestore()
    .collection("listings")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        listings.push(doc.data());
      });
    });
  return listings;
};

const uploadListing = async (listing) => {
  let refID = "";
  let urls = [];
  const data = new Object({
    title: listing.title,
    price: listing.price,
    category: listing.category,
    description: listing.description,
    createdAt: new Date(),
    images: [],
  });

  //Upload listing in firestore and set the ID for the image reference.

  await refFireStore
    .add(data)
    .then((docRef) => {
      console.log("Uploaded! " + docRef.id);
      refID = docRef.id;
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

  //Upload image from the Listing in Firebase storage and get their url back to update
  urls = await uploadImages(listing.images, refID);
  console.log(urls);

  return await refFireStore
    .doc(refID)
    .update({
      images: urls,
    })
    .then(() => console.log("images updated"));
};

const uploadImages = async (images, id) => {
  let urls = [];
  for (let i = 0; i < images.length; i++) {
    const response = await fetch(images[i]);
    const blob = await response.blob();

    ref = refStorage.child(id + " : " + i.toString());

    await ref.put(blob);

    await ref.getDownloadURL().then((url) => {
      urls.push(url);
    });
  }

  return urls;
};

export default { getListings, uploadListing };