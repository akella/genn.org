import {TimelineMax} from 'gsap';

const texts = [
'Product Design',
'UX/UI Design',
'Design Systems',
'Art Direction',
'User Research',
'Brand Identity',
'Visual Comms',
'Prototyping',
'Info Architecture',
'Infographics',
'CX Design'
/* 'Being boring',
'Nitpicking me',
'Sarcasm',
'Headache',
'Raising daughter',
'Being cool',
'Nerdy',
'БОТАН', */
]
const pick = function(myarray){
	return myarray[Math.floor(Math.random() * myarray.length)];
}


const max = 6;
const currentTexts = [];

const ul = document.querySelector('.skills__list');
// const ul = document.createElement('ul');
// el.appendChild(ul);

for (let i = 0; i < max; i++) {
	const li = document.createElement('li');
	const span = document.createElement('span');
	const div = document.createElement('div');
	div.innerText = texts[i];
	currentTexts.push(texts[i]);
	li.appendChild(span);
	li.appendChild(div);
	ul.appendChild(li);
	
}

function ChangeRandomText(){
	const tl = new TimelineMax();
	const randIndex = Math.floor(Math.random() * max);
	// console.log(randIndex);
	const randomLI = ul.children[randIndex];
	const randomSpan = randomLI.querySelector('span');
	const randomSkill = randomLI.querySelector('div');

	// THIS IS WHERE TO CHECK FOR NEW TEXTS
	// compare with currentTexts
	const notVisible = texts.filter(n => !currentTexts.includes(n));
	// console.log(notVisible);
	// console.log(currentTexts);
	// console.log(notVisible);
	const nextText = pick(notVisible);
	// 
	tl.set(randomSpan,{x:"-100%"})
	tl.to(randomSpan,
		.3,
		{x:"0%",onComplete:()=>{
			randomSkill.innerText = nextText;
			currentTexts[randIndex] = nextText;
		}}
	)
	.to(randomSpan,.5,{
		x: '102%'
	})

	setTimeout(()=>{
		ChangeRandomText();
	},2000)
}



ChangeRandomText();







