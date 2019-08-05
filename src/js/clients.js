import {TimelineMax} from 'gsap';

const texts = [
'20 years.',
'7 300 days.',
'438 000 hours.',
'26•10⁶ mins.',
'6.307e+8 sec.',
'fun.',
'ages!']

const header = document.querySelector('.clients__header');
// const ul = document.createElement('ul');
// el.appendChild(ul);


function ChangeDurationText(){
	const tl = new TimelineMax();
	const durationTxt = header.querySelector('span');

	// Take the new element and move it to the end of the array
	// compare with currentTexts
	const newTxt = texts.shift();
	console.log(newTxt);
	texts.push(newTxt);
	console.log(texts);

	durationTxt.innerText = newTxt;

	setTimeout(()=>{
		ChangeDurationText();
	},5000)
}



ChangeDurationText();







