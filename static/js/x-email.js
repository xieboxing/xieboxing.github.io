(function() {
		    $(".alert.alert-warning").hide();
		    $(".alert.alert-success").hide();
		    $(".alert.alert-danger").hide();
            emailjs.init('jWHShUevKXcDVWnYM');
        })();

		 $("#messageSubmit").on("click", function(event) {
			event.preventDefault();
		    const name = $("#name").val();
		    const email = $("#email").val();
		    const message = $("#message").val();

			if (name === "" || email === "" || message === "") {
		    	$(".alert.alert-success").hide();
		    	$(".alert.alert-danger").hide();
		    	$(".alert.alert-warning").show();
		    	return;
		    }

		 	const currentTime = new Date().getTime();
            const requestLimit = 5;
            const interval = 5 * 60 * 1000;

            let requestHistory = JSON.parse(localStorage.getItem("x-requestHistory")) || [];
            requestHistory = requestHistory.filter(function(requestTime) {
                return currentTime - requestTime <= interval;
            });

            if (requestHistory.length < requestLimit) {
                requestHistory.push(currentTime);
                localStorage.setItem("x-requestHistory", JSON.stringify(requestHistory));
            } else {
                $(".alert.alert-danger").text(`Sorry something went wrong! Error:Request limit exceeded. Please wait for 5 minutes.`);
		        $(".alert.alert-success").hide();
		        $(".alert.alert-danger").show();
		        $(".alert.alert-warning").hide();
                return;
            }

		    emailjs.send("service_g5y52t9", "template_ghpgb6e", {
		      user_name: name,
		      user_email: email,
		      message: message
		    })
		    .then(function(response) {
			  $("#name").val("");
	          $("#email").val("");
	          $("#message").val("");
		      $(".alert.alert-danger").hide();
		      $(".alert.alert-warning").hide();
		  	  $(".alert.alert-success").show();
		    }, function(error) {
		      $(".alert.alert-danger").text("Sorry something went wrong! "+(error&&error.status==400&&error.text)||"");
		      $(".alert.alert-success").hide();
		      $(".alert.alert-warning").hide();
		      $(".alert.alert-danger").show();
		    });
		  });