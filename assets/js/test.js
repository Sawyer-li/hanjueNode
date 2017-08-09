$(function(){
	alert('');
	$.ajax({
		type: 'POST',
		dataType: 'json',
		data:{
			PID: '123',
			OPERATE: 'dsasd'
		},
		url: 'http://192.168.31.134:8080/hanjue/postSearch/getPostDetail',
		success: (res) => {
			console.log(res);
		}
	})
})