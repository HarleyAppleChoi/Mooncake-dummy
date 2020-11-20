import * as Parcel from '@oasislabs/parcel-sdk';

const configParams = Parcel.Config.paramsFromEnv();
const config = new Parcel.Config(configParams);

async function main(address:string,actual_data:string) {
    /* // Find the identity address associated with the private key you supplied
    // above.
    const identityAddress = Parcel.Identity.addressFromToken(await config.tokenProvider.getToken());

    // Let's connect to the identity.
    const identity = await Parcel.Identity.connect(identityAddress, config);
    console.log(`Connected to identity at address ${identity.address.hex}`);

    // Now let's upload a dataset.
    const datasetMetadata = {
        title: 'My First Dataset',
        // A (fake) example metadata URL.
        metadataUrl: 'http://s3-us-west-2.amazonaws.com/my_first_metadata.json',
    };

    // The dataset: 'hooray!', encoded as a Uint8Array.
    const data = new TextEncoder().encode('hooray!');
    console.log('Uploading data for our user');
    const dataset = await Parcel.Dataset.upload(data, datasetMetadata, identity, config);
    // `dataset.address.hex` is your dataset's unique ID.
    console.log(
        `Created dataset with address ${dataset.address.hex} and uploaded to ${dataset.metadata.dataUrl}`,
    );

    // By default, the dataset owner can download the data.
  const datasetToDownload = await Parcel.Dataset.connect(dataset.address, identity, config);
  
  console.log(`Connected to dataset ${datasetToDownload.address.hex}`);
    const secretDataStream = datasetToDownload.download();
    const secretDatasetWriter = secretDataStream.pipe(
        require('fs').createWriteStream('./user_data'),
    );

    // Utility method.
    const streamFinished = require('util').promisify(require('stream').finished);
    try {
        await streamFinished(secretDatasetWriter);
        console.log(`Dataset ${datasetToDownload.address.hex} has been downloaded to ./user_data`);
    } catch (e) {
        throw new Error(`Failed to download dataset at ${datasetToDownload.address.hex}`);
    }
    const secretData = require('fs').readFileSync('./user_data').toString();
  console.log(`Hey dataset owner! Here's your data: ${secretData}\n`);
   */
  //upload for other people
  const aliceConfig = new Parcel.Config(Parcel.Config.paramsFromEnv());
  const aliceIdentityAddress = Parcel.Identity.addressFromToken(
      await aliceConfig.tokenProvider.getToken(),
  );
  const aliceIdentity = await Parcel.Identity.connect(aliceIdentityAddress, config);

  const bobIdentityAddress = new Parcel.Address(address)
  const bobIndentity = await Parcel.Identity.connect(bobIdentityAddress, config)

  const datasetMetadata = {
    title: "User's data",
    metadataUrl: 'http://s3-us-west-2.amazonaws.com/my_first_metadata.json',
  }

  const data = new TextEncoder().encode(actual_data)
  console.log('Uploading data for User');
  const dataset = await Parcel.Dataset.upload(
    data,
    datasetMetadata,
    // The dataset is uploaded for Bob...
    await Parcel.Identity.connect(bobIdentityAddress, aliceConfig),
    // ...with Alice's credentials being used to do the upload...
    aliceConfig,
    {
        // ...and Alice is flagged as the dataset's creator.
        creator: aliceIdentity,
    },
  );

  console.log(
    `Created dataset with address ${dataset.address.hex} and uploaded to ${dataset.metadata.dataUrl}\n`,
  );
  //try to download using alice identity
/* const datasetToDownload = await Parcel.Dataset.connect(dataset.address, aliceIdentity, config);

  try {
  console.log(`Attempting to access Bob's data without permission...`);
  await new Promise((resolve, reject) => {
      const decryptedStream = datasetToDownload.download();
      decryptedStream.on('error', reject);
      decryptedStream.on('end', resolve);
  });
  throw new Error('This should not happen.');
} catch (e) {
  // this is expected
  console.log(`Error: ${e.constructor.name}`);
  console.log("`aliceIdentity` was not able to access Bob's data (expected).\n");
  } */
  
  //should be ok to download
  console.log("downloading bob's data using bob identnty")
  const bobToDownload = await Parcel.Dataset.connect(dataset.address, bobIndentity, config)
  const goodStream = bobToDownload.download();
  
  //write to stream
  const secretDatasetWriter = goodStream.pipe(
    require('fs').createWriteStream('./user_data'),
);

// Utility method.
  const streamFinished = require('util').promisify(require('stream').finished);
  try {
      await streamFinished(secretDatasetWriter);
      console.log(`Dataset ${bobToDownload.address.hex} has been downloaded to ./user_data`);
  } catch (e) {
      throw new Error(`Failed to download dataset at ${bobToDownload.address.hex}`);
  }
  const secretData = require('fs').readFileSync('./user_data').toString();
  console.log(`Hey dataset owner! Here's your data: ${secretData}\n`);
    
}



main()
    .then(() => console.log('All done!'))
    .catch((err) => {
        console.log(`Error in main(): ${err.stack || JSON.stringify(err)}`);
        process.exitCode = 1;
    });