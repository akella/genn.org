const hello = document.querySelector('.hello');

function handler(entries) {
  	entries.forEach(entry => {
		if(entry.intersectionRatio!==1){
	      alert('Visible');
	    }
	    else {alert('Not Visible');}
	},{threshold: 1});
}


const observer = new IntersectionObserver(handler);
observer.observe(hello);