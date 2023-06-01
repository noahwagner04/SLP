// config has frameArray, frameTime, animationTime (overrides frameTime), repeat (bool)
class Animation {
	constructor(config) {
		this.frameArray = config.frameArray;

		this.frameIndex = 0;

		this.frameTime = config.frameTime || config.animationTime / this.frameArray.length;

		this.animationTime = config.animationTime || this.frameTime * this.frameArray.length;

		this.repeat = !!(config.repeat);

		this.frameEvents = {};

		this.onNewFrame = typeof config.onNewFrame === "function" ? config.onNewFrame : undefined;

		this.intervalId;

		this.eventId = 0;
	}

	play() {
		this.intervalId = setInterval(function() {
			if (this.frameEvents[this.frameIndex]) {
				for (let i = 0; i < this.frameEvents[this.frameIndex].length; i++) {
					let eventObj = this.frameEvents[this.frameIndex][i];
					eventObj.event(...eventObj.params);
				}
			}

			if (this.repeat) {
				this.frameIndex = (this.frameIndex + 1) % this.frameArray.length;
			} else if (this.frameIndex < this.frameArray.length) {
				this.frameIndex++;
			}
			if(this.onNewFrame) this.onNewFrame(this.frameArray[this.frameIndex]);

		}.bind(this), this.frameTime * 1000);
		return this;
	}

	stop() {
		clearInterval(this.intervalId);
		return this;
	}

	reset() {
		this.frameIndex = 0;
		return this;
	}

	addFrameEvent(frameIndex, event, ...params) {
		if (!this.frameEvents[frameIndex]) this.frameEvents[frameIndex] = [];
		this.frameEvents[frameIndex].unshift({
			id: this.eventId,
			event: event,
			params: params,
		});
		// return the id of the event, then increment it by 1
		return this.eventId++;
	}

	removeFrameEvent(eventId) {

		let eventIndex;
		for (const property in this.frameEvents) {
			// fetch the event from the given id
			eventIndex = this.frameEvents[property].findIndex(
				(event) => event.id === eventId
			);
			if(eventIndex >= 0) {
				this.frameEvents[property].splice(eventIndex, 1);
				break;
			}
		}

		return this;
	}

	getFrame() {
		return this.frameArray[this.frameIndex];
	}
}

export {
	Animation
};