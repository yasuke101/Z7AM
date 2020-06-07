localStorage.setItem('en_flag',false);

var lan = {
	en:{
		lan_fire:'العربية',
		feedback_button:'Feedbacks',
		current_users_label:'Current users number: ',
		title_why:'Why Blastna ?',
		text_why:'The closer you are to an infected person, the greater the risk of infection with the virus. Blasty will help you in advance to know the crowded places.',
		title_how:'How it works ?',
		text_how:'No database is used, which means that we do not store your data, we provide you with live data only, using Sockets',
		how1:'interactive map: clustering together close locations, using meaningful symbols colors and numbers',
		how2:"Your identity and the one of others stays secret,You're only represented by a red point",
		title_benefit:'How can I benefit?',
		text_benefit:'Simply, share your location with others so you can see theirs',	
		give_feedback:'Share with us your thoughts, feedbacks and proposition by sending us an Email on'	
	},
	ar:{
		lan_fire:'English',
		feedback_button:'ملاحظات واقتراحات ',
		current_users_label:'عدد المستخدمين الحاليين : ',
		title_why:'لماذا Blastna ؟',
		text_why:'كلما اقتربت من شخص مصاب ، زاد خطر الإصابة بالفيروس. Blastna سوف يساعدك مسبقا على معرفة الأماكن المزدحمة.',
		title_how:'كيف يعمل ؟',
		text_how:'لا يتم استخدام أي قاعدة بيانات ، مما يعني أننا لا نقوم بتخزين بياناتك ، نحن نقدم لك بيانات حية فقط باستخدام خريطة تفاعلية تمكن من:',
		how1:'تجميع المواقع القريبة معًا ، باستخدام ألوان وأرقام تترجم حدة الإكتظاظ',
		how2:'تمثيل موقعك وموقع الاخرين بنقط حمراء ، حافظ على سرية هويتك',
		title_benefit:'كيف يمكنني الاستفادة ؟',
		text_benefit:'ببساطة، شارك موقعك مع الاخرين حتى تتمكن من رؤية خاصتهم',	
		give_feedback:'شارك معنا أفكارك وملاحظاتك واقتراحك عن طريق إرسال بريد إلكتروني إلينا على'
	}
};


document.getElementById('lan_fire').onclick = function change_lan() {
	if(localStorage.getItem('en_flag') == "true"){
		// arabic content 
		lan_fire.textContent = lan.ar.lan_fire;
		feedback_button.textContent = lan.ar.feedback_button;
		current_users_label.textContent = lan.ar.current_users_label;
		title_why.textContent = lan.ar.title_why;
		text_why.textContent = lan.ar.text_why;
		title_how.textContent = lan.ar.title_how;
		text_how.textContent = lan.ar.text_how;
		how1.textContent = lan.ar.how1;
		how2.textContent = lan.ar.how2;
		title_benefit.textContent = lan.ar.title_benefit;
		text_benefit.textContent = lan.ar.text_benefit;
		give_feedback.textContent = lan.ar.give_feedback;
		en_flag=false;
		localStorage.setItem('en_flag',false);
	}else if(localStorage.getItem('en_flag') == "false"){
		// english content 
		document.getElementById('content').style.direction = "ltr";

		lan_fire.textContent = lan.en.lan_fire;
		feedback_button.textContent = lan.en.feedback_button;
		current_users_label.textContent = lan.en.current_users_label;
		title_why.textContent = lan.en.title_why;
		text_why.textContent = lan.en.text_why;
		title_how.textContent = lan.en.title_how;
		text_how.textContent = lan.en.text_how;
		how1.textContent = lan.en.how1;		
		how2.textContent = lan.en.how2;
		title_benefit.textContent = lan.en.title_benefit;
		text_benefit.textContent = lan.en.text_benefit;
		give_feedback.textContent = lan.en.give_feedback;		
		en_flag=true;
		localStorage.setItem('en_flag',true);
	}
}