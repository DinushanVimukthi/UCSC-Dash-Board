import { fAuth, fS, fDb } from "src/boot/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { ref as DBref, set, get } from "firebase/database";
import imageCompression from "browser-image-compression";
function IsUser() {
  if (fAuth.currentUser) {
    console.log("Triggered! ", fAuth.currentUser.uid);
    return true;
  } else {
    console.log("Not Logged");
    return false;
  }
}
async function Upload(File) {
  console.log(File.files[0]);
  const imageFile = File.files[0];
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  let UserId=fAuth.currentUser.uid;
  
    try {
    const compressedFile = await imageCompression(imageFile, options);
    // const compressedFile = File
    const FileStorageref = ref(fS, "/images/" + UserId);
    const snapshot = await uploadBytes(FileStorageref, compressedFile).then(() => {
      console.log("Uploaded a blob or file!");
    });
    const Url = await getDownloadURL(FileStorageref);
    console.log(Url);
    
    const fileDbref = DBref(fDb, "/images/" + fAuth.currentUser.uid);
    await set(fileDbref, {
      ID: currentUserId,
      Name: File.name,
      Url: Url,
    });
  } catch (error) {
    console.log(error);
  }
}

const RetrieveImages = async () => {
  const FileStorageref = DBref(fDb, "images/" + fAuth.currentUser.uid);
  const res = await get(FileStorageref).then((snapshot) => {
    // return snapshot.val().Url;
  });
  console.log(res);
  // return res;
};
export { IsUser, Upload, RetrieveImages };
