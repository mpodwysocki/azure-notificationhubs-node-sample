import { NotificationHubService } from 'azure-sb';
import { HUB_NAME, CONNECTION_STRING, APNS_REGISTRATION_ID, GCM_REGISTRATION_ID } from './constants';

const SAMPLE_TAG = 'language_en';

const GCM_MESSAGE = {
	"notification":{
		"title": "Notification Hub Test Notification",
		"body": "This is a sample notification delivered by Azure Notification Hubs."
	},
	"data":{
		"property1": "value1",
		"property2": 42
	}
}

const APNS_MESSAGE = {
  aps: {
    alert: {
      "title": "Notification Hub Test Notification",
      "body": "This is a sample notification delivered by Azure Notification Hubs."
    }
  }
};

const service = new NotificationHubService(HUB_NAME, CONNECTION_STRING, '', '');

if (APNS_REGISTRATION_ID) {
  service.apns.createNativeRegistration(APNS_REGISTRATION_ID, SAMPLE_TAG, (err, response) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log('Registration success');
    console.log(JSON.stringify(response));

    service.apns.send(SAMPLE_TAG, APNS_MESSAGE, (error, res) => {
      if (error) {
        console.log(error);
        return;
      }

      console.log('Message sent');
      console.log(JSON.stringify(res));
    });
  });
}

if (GCM_REGISTRATION_ID) {
  service.gcm.createNativeRegistration(GCM_REGISTRATION_ID, SAMPLE_TAG, (err, response) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log('Registration success');
    console.log(JSON.stringify(response));

    service.gcm.send(SAMPLE_TAG, GCM_MESSAGE, (error, res) => {
      if (error) {
        console.log(error);
        return;
      }

      console.log('Message sent');
      console.log(JSON.stringify(res));
    });
  });
}

