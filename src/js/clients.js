import {TimelineMax} from 'gsap';

const texts = [
'20 years.',
'7 300 days.',
'438 000 hours.',
'26•10⁶ mins.',
'6.307e+8 sec.',
'fun.',
'ages!']


function ChangeDurationText(){
	const tl = new TimelineMax();
	const durationTxt = document.querySelector('.clients__header__duration');

	// Take the new element and move it to the end of the array
	const newTxt = texts.shift();
	texts.push(newTxt);

	durationTxt.innerText = newTxt;

	setTimeout(()=>{
		ChangeDurationText();
	},2000)
}



ChangeDurationText();







