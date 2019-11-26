import uuidv4 from 'uuid/v4';

import { fetchImages, fetchIpsum } from './api';

const getRandomToMax = (max) => {
	return Math.floor(Math.random() * Math.floor(max));

}
export const newEvent =  async (attrs = {}) => {
	try {
		const imageCount = 20;
		const ipsumSentenceCount = 100;

		const items = await fetchImages(imageCount);
		const ipsum = await fetchIpsum(ipsumSentenceCount);

		const ipsumArr = ipsum.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");

		const ipsumIndex = getRandomToMax(ipsumSentenceCount-10);
		const imageIndex = getRandomToMax(imageCount);

		const event = {
			id: uuidv4(),
			author: attrs.author || items[imageIndex].user.name,
			title: attrs.title || ipsumArr[ipsumIndex].split(' ').slice(0,3).join(' '),
			description: attrs.description || ipsumArr[ipsumIndex+1] + ipsumArr[ipsumIndex+2],
			image: items[imageIndex].urls.raw + "&w=600&h=600",
		};

	  	return event;
	} catch (e) {
		console.log(e);
	}
}

export const newEvents = async () => {
	try {
      const items = await fetchImages(20);
      const ipsum = await fetchIpsum(100);

      const ipsumArr = ipsum.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
      var ipsumIndex = 1;

      var events = [];
      var index = 0;
      items.forEach((item) => {
        const event = {
	        id: item.id,
	        author: item.user.name,
	        title: ipsumArr[ipsumIndex].split(' ').slice(0,3).join(' '),
	        description: ipsumArr[ipsumIndex+1] + ipsumArr[ipsumIndex+2],
	        image: item.urls.raw + "&w=600&h=600",
	    };

	    events[index++] = event;
        ipsumIndex += 3;
        if (ipsumIndex >= ipsumArr.length) { ipsumIndex = 1;}
      });

      return events;
  	} catch (e) {
  		console.log(e);
  	};
}