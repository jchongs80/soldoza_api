import { BlobServiceClient } from '@azure/storage-blob';

export const getAccessContainerAzure = () => {
  const blobClientService = BlobServiceClient.fromConnectionString(
    process.env.AZURE_CONNECTION,
  );
  const containerClient = blobClientService.getContainerClient(
    process.env.CONTAINER_NAME,
  );
  return containerClient;
};

export const getBlobClient = async (imageName: string) => {
  const containerClient = getAccessContainerAzure();
  await containerClient.createIfNotExists({ access: 'container' });
  const blobClient = containerClient.getBlockBlobClient(imageName);
  return blobClient;
};

export const uploadFileToBlobStorage = async (file: Express.Multer.File) => {
  try {
    const blobClient = await getBlobClient(file.originalname);
    await blobClient.uploadData(file.buffer);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getFileURLFromBlobStorage = async (file: Express.Multer.File) => {
    const blobClient = await getBlobClient(file.originalname);
    return blobClient.url;
  };
  
