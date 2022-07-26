
var oldDownload = false;
$(function () {
	
    var BASE_URL = "/";
    var isUpgrade = false;
	
	// ndate
	var dt = new Date();
	var ny = dt.getFullYear(); 
	var nm = dt.getMonth() + 1; 
	var nd = dt.getDate(); 

	if(nm < 10) nm = '0' + nm
	if(nd < 10) nd = '0' + nd
	
	$(".ndate").text(ny + "년 " + nm + "월 " + nd + "일");

	// 동일하게 하기
	$("#rdo0001").change(function () {
		 if($("#rdo0001").is(":checked")){
			var bx = $('.pric-bx:eq(1)');
			var company = $("[name='sen-company']").val();
			var name = $("[name='sen-name']").val();
			var telephone = $("[name='telephone']").val();
			var email = $("[name='sen-mail']").val();
			
			$("[name='license-company']").val(company);
			$("[name='license-name']").val(name);
			$("[name='license-telephone']").val(telephone);
            $("[name='license-mail']").val(email);
            
            // 업그레이드
			$("#up-company2").val($("#up-company").val());
			$("#up-name2").val($("#up-name").val());
			$("#up-telephone2").val($("#up-telephone").val());
            $("#up-email2").val($("#up-email").val());
		}
    });
    // 구버전 다운로드
	$(".oldDownload").click(function (e) {
        e.preventDefault();
        $('#pop-down').bPopup({
            onOpen: function() { 
                oldDownload = true;
            }, 
            onClose: function() {
                oldDownload = false;
            }
        });
    });

    // 기존 다운로드
	$("#pop-down .btn-old-download").click(function (e) {
		e.preventDefault();
		
		// 기존 고객 이메일
        var oldEmail = $("#pop-down .dv-row:last [type='text']").val();
        
        if (!oldEmail) {
            alert("이메일을 입력하세요.");
            $("#pop-down .dv-row:last [type='text']").focus();
            return;
        }

        if (!validateMailAddress(oldEmail)) {
            alert("잘못된 메일 주소입니다.");
            $("#pop-down .dv-row:last [type='text']").focus();
            return;
        }

        var payload = {
				email : oldEmail,
				type : '1',
				version : oldDownload ? '2.x' : '3.x',		
        };
        
		ajaxCall("POST", "servlet/download", payload, function (res) {
			if (res != null && res == "true") {
				alert('메일 전송이 완료되었습니다.');
				$('#pop-down').bPopup().close();
			}
			if (res == "400") {
				alert('등록된 메일 주소가 없거나 실패하였습니다.');
			}
			if (res == "false") {
				alert('메일 전송이 실패하였습니다.');
            }
            // 초기화
            $("#pop-down [name='email']").val("");
            $("#pop-down [name='comName']").val("");
            $("#pop-down [name='name']").val("");
            $("#pop-down .dv-row:last [type='text']").val("");
		}, function (res) {
			if (res != null && res == "true") {
				alert('메일 전송이 완료되었습니다.');
				$('#pop-down').bPopup().close();
			} else {
				alert('메일 전송이 실패하였습니다.');
			}
            // 초기화
            $("#pop-down [name='email']").val("");
            $("#pop-down [name='comName']").val("");
            $("#pop-down [name='name']").val("");
            $("#pop-down .dv-row:last [type='text']").val("");
		});
	});
    
    // 다운로드
	$("#pop-down .btn-new-download").click(function (e) {
		e.preventDefault();
		
		var email = $("#pop-down [name='email']").val();
		var company = $("#pop-down [name='comName']").val();
		var name = $("#pop-down [name='name']").val();
		
        if (!email) {
            alert("이메일을 입력하세요.");
            $("#pop-down [name='email']").focus();
            return;
        }
        if (!validateMailAddress(email)) {
            alert("잘못된 메일 주소입니다.");
            $("#pop-down [name='email']").focus();
            return;
        }
        if (!company) {
            alert("회사명을 입력하세요.");
            $("#pop-down [name='comName']").focus();
            return;
        }
        if (!name) {
            alert("이름을 입력하세요.");
            $("#pop-down [name='name']").focus();
            return;
        }
        if ($("#pop-down [name='radoi000']:checked").val() != "Y") {
            alert("개인정보 수집 및 이용에 동의하세요.");
            return;
		}
		
		var payload = {
				email : email,
				company : company,
				name : name,
				type : '2',
				version : oldDownload ? '2.x' : '3.x',		
		};

		ajaxCall("POST", "servlet/download", payload, function (res) {
			if (res != null && res == "true") {
				alert('메일 전송이 완료되었습니다.');
				$('#pop-down').bPopup().close();
			}
			if (res == "400") {
				alert('등록된 메일 주소가 없거나 실패하였습니다.');
			}
			if (res == "false") {
				alert('메일 전송이 실패하였습니다.');
            }
            // 초기화
            $("#pop-down [name='email']").val("");
            $("#pop-down [name='comName']").val("");
            $("#pop-down [name='name']").val("");
            $("#pop-down .dv-row:last [type='text']").val("");
		}, function (res) {
			if (res != null && res == "true") {
				alert('메일 전송이 완료되었습니다.');
				$('#pop-down').bPopup().close();
			} else {
				alert('메일 전송이 실패하였습니다.');
			}
            // 초기화
            $("#pop-down [name='email']").val("");
            $("#pop-down [name='comName']").val("");
            $("#pop-down [name='name']").val("");
            $("#pop-down .dv-row:last [type='text']").val("");
		});
	});
	
	// 구매수량 입력
	$("#number-of-copy").keyup(function (e) {
		var copy = $(this).val();
		var dr = computeDiscountRate(copy);
		
		// 소비자
		$("#original-price").text(1000000 * copy).digits();
		
		// 할인
		$("#discount-rate").text(dr * 100);
		
		var unitPrice = 1000000 - 1000000 * dr;
		// 할인금액
		$("#discount-amount").text(1000000 * dr * copy).digits();
		
		// 전체금액
		var totalPrice = unitPrice * copy;
		$("#total-price").text(totalPrice).digits();
		
		// 아래 갯수
		$("#number-of-copy2").text(copy);
		
		// 전송 갯수
		$("#sen-quantity").val(copy);
		
		// 미리보기 갯수
		$(".tot-copy").text(copy);
		// 미리보기 소비자가
		$(".tot-original-price").text(1000000 * copy).digits();
		// 미리보기 할인율 : 15 % (- 4,500,000 원)
		$(".tot-discount").text(dr * 100 + " % (- " + $("#discount-amount").text() + " 원)");
		
		// 미리보기 부가세 : 10 % (+ 2,550,000 원)
		var vat = totalPrice * 0.1;
		$(".tot-vat").text("10 % (+ " + numberFormat(vat) + " 원)");

		// 공급가
		$(".tot-price2").text(totalPrice + " 원").digits();
		
		// 미리보기 전채금액
		$(".tot-price").text(totalPrice+vat).digits();
		$(".tot-price3").text(totalPrice+vat + " 원").digits();
		
		// 
	});
	
	// 구매하기
	$("#btn-reg").click(function (e) {
		e.preventDefault();
		
		var copy = $("#number-of-copy").val();
		var company = $("[name='sen-company']").val();
		var project = $("[name='sen-project']").val();
		var addr = $("[name='sen-address']").val();
		var name = $("[name='sen-name']").val();
		var director = $("[name='sen-director']").val();
		var telephone = $("[name='telephone']").val();
		var email = $("[name='sen-mail']").val();
		
		var company2 = $("[name='license-company']").val();
		var name2 = $("[name='license-name']").val();
		var telephone2 = $("[name='license-telephone']").val();
		var email2 = $("[name='license-mail']").val();
		
		if (!copy || copy == "0") {
			alert("수량을 1개 이상 입력하세요.");
			return;
		}
		
		if (!company) {
			alert("회사명을 입력하세요.");
			return;
		}
		
		if (!director) {
			alert("대표자명을 입력하세요.");
			return;
		}
		
		if (!project) {
			alert("사업명을 입력하세요.");
			return;
		}
		if (!addr) {
			alert("주소을 입력하세요.");
			return;
		}
		if (!name) {
			alert("담당자명을 입력하세요.");
			return;
		}
		if (!telephone) {
			alert("연락처을 입력하세요.");
			return;
        }
        if (!validatePhoneNumber(telephone)) {
            alert("연락처는 “-”을 포함하여 작성해주세요.");
            return;
        }
		if (!email) {
			alert("이메일을 입력하세요.");
			return;
		}

		if (!company2) {
			alert("회사명을 입력하세요.");
			return;
		}
		if (!name2) {
			alert("담당자명을 입력하세요.");
			return;
		}
		if (!telephone2) {
			alert("연락처을 입력하세요.");
			return;
		}
        if (!validatePhoneNumber(telephone2)) {
            alert("연락처는 “-”을 포함하여 작성해주세요.");
            return;
        }
		if (!email2) {
			alert("이메일을 입력하세요.");
			return;
		}
		
		if (!$("[name='aggr']")[0].checked) {
			alert("개인정보수집 안내 동의를 선택하세요.");
			return;
		}
		
		// 미리보기에 값 넣기
		$(".p-name").text(name);
		$(".p-telephone").text(telephone);
		$(".p-company").text(company);
		$(".p-director").text(director);
		$(".p-company2").text(company);
		$(".p-email").text(email);
		$(".p-project").text(project);
		$(".p-company3").text(company2);
		$(".p-email3").text(email2);
		$(".p-addr").text(addr);
		
		// 미리보기 팝업
		callBpop("#pop-reg");
	});

	// 견적서 발송
	$("#btn-buy").click(function (e) {
		e.preventDefault();

		var bx = $('.pric-bx:eq(1)');
		var copy = $("#number-of-copy").val();
		var company = $("[name='sen-company']").val();
		var project = $("[name='sen-project']").val();
		var addr = $("[name='sen-address']").val();
		var name = $("[name='sen-name']").val();
		var telephone = $("[name='telephone']").val();
		var email = $("[name='sen-mail']").val();
		
		var company2 = $("[name='license-company']").val();
		var name2 = $("[name='license-name']").val();
		var telephone2 = $("[name='license-telephone']").val();
		var email2 = $("[name='license-mail']").val();

		if (!copy || copy == "0") {
			alert("수량을 1개 이상 입력하세요.");
			return;
		}
		
		if (!company) {
			alert("회사명을 입력하세요.");
			return;
		}
		if (!project) {
			alert("사업명을 입력하세요.");
			return;
		}
//		if (!addr) {
//			alert("주소을 입력하세요.");
//			return;
//		}
		if (!name) {
			alert("담당자명을 입력하세요.");
			return;
		}
		if (!telephone) {
			alert("연락처을 입력하세요.");
			return;
		}
        if (!validatePhoneNumber(telephone)) {
            alert("연락처는 “-”을 포함하여 작성해주세요.");
            return;
        }
		if (!email) {
			alert("이메일을 입력하세요.");
			return;
		}

		if (!company2) {
			alert("회사명을 입력하세요.");
			return;
		}
		if (!name2) {
			alert("담당자명을 입력하세요.");
			return;
		}
		if (!telephone2) {
			alert("연락처을 입력하세요.");
			return;
		}
        if (!validatePhoneNumber(telephone2)) {
            alert("연락처는 “-”을 포함하여 작성해주세요.");
            return;
        }
		if (!email2) {
			alert("이메일을 입력하세요.");
			return;
		}
		
		if (!$("[name='aggr']")[0].checked) {
			alert("개인정보수집 안내 동의를 선택하세요.");
			return;
		}
		
//		$("#order-form").attr("action", "../payment/orderProcess");
//		$("#order-form").attr("target", "_blank");
		
		// 미리보기에 값 넣기
		$(".p-name").text(name);
		$(".p-telephone").text(telephone);
		$(".p-company").text(company);
		$(".p-company2").text(company);
		$(".p-email").text(email);
		$(".p-project").text(project);

		// 미리보기 팝업
		callBpop("#pop-buy");
	});
	
	// 견적 하기
	$(".buy-save-btn").click(function (e) {
		e.preventDefault();

		var bx = $('.pric-bx:eq(1)');
		var copy = $("#number-of-copy").val();
		var company = $("[name='sen-company']").val();
		var project = $("[name='sen-project']").val();
		var addr = $("[name='sen-address']").val();
		var name = $("[name='sen-name']").val();
		var telephone = $("[name='telephone']").val();
		var email = $("[name='sen-mail']").val();
		
		var company2 = $("[name='license-company']").val();
		var name2 = $("[name='license-name']").val();
		var telephone2 = $("[name='license-telephone']").val();
		var email2 = $("[name='license-mail']").val();
		
		var payload = {
			"rec-quantity" : copy, 
			"rec-project-name" : project, 
			"rec-name" : name, 
			"rec-org" : company, 
			"rec-tel" : telephone, 
			"rec-mail" : email, 
			"cus-name" : name2, 
			"cus-org" : company2, 
			"cus-tel" : telephone2, 
			"cus-mail" : email2, 
			"purchase-type" : "normal",
			"lang" : "ko",
			"country" : "KR",
			"upgrade" : "false",
			"unitPrice" : "1000000",
		};

		ajaxCall("POST", "payment/estimateProcess", payload, function (msg) {
			if(msg == "0000"){
				alert("견적서가 발송 되었습니다.");
				$('#pop-buy').bPopup().close();
			}else if(msg == "4000"){
				alert("처리중입니다. 잠시만 기다려주세요.");
			}else {
				alert("문제가 발생했습니다.");
			}
		}, function (res) {
			alert("문제가 발생했습니다.");
		});
		
	});

	// 구매 하기
	$(".reg-save-btn").click(function (e) {
		e.preventDefault();

		var bx = $('.pric-bx:eq(1)');
		var copy = $("#number-of-copy").val();
		var company = $("[name='sen-company']").val();
		var project = $("[name='sen-project']").val();
		var addr = $("[name='sen-address']").val();
		var name = $("[name='sen-name']").val();
		var telephone = $("[name='telephone']").val();
		var email = $("[name='sen-mail']").val();
		var director = $("[name='sen-director']").val();
		var company2 = $("[name='license-company']").val();
		var name2 = $("[name='license-name']").val();
		var telephone2 = $("[name='license-telephone']").val();
		var email2 = $("[name='license-mail']").val();
		
		// 전화번호 자르기
		var tel = telephone.split("-");
		

		var formdata = new FormData();
		formdata.append("preOrderNum", "null");
		formdata.append("isUpgrade", "false");
		formdata.append("unitPrice", "1000000");
		formdata.append("sen-quantity", copy);
		formdata.append("sen-project", project);
		formdata.append("sen-company", company);
		formdata.append("sen-address", addr);
		formdata.append("sen-director", director);
		formdata.append("sen-name", name);
		formdata.append("sen-tel1", tel[0]);
		formdata.append("sen-tel2", tel[1]);
		formdata.append("sen-tel3", tel[2]);
		formdata.append("sen-mail", email);
		formdata.append("license-name", name2);
		formdata.append("license-mail", email2);
		formdata.append("sen-event-code",  "");
		formdata.append("sen-purchase-type", "normal");
		
		if ($("[name='v_file']").val()) {
			formdata.append('sen-file', $("[name='v_file']")[0].files[0]);
		}
		
		ajaxCall2("POST", "payment/orderProcess", formdata, function (msg) {
			if (msg == "0000") {
				alert("구매 신청이 완료되었습니다.\n안내 메일이 발송 되었습니다.");
				$('#pop-reg').bPopup().close();
			} else if (msg == "4000"){
				alert("처리중입니다. 잠시만 기다려주세요.")
			} else if (msg == "2100") {
				alert("파일 사이즈 2MB를 넘었습니다.");
				orderCount = 0;
			} else if (msg == "3001") {
				alert("쿠폰 코드가 일치하지 않습니다.");
				orderCount = 0;
			} else if (msg == "3002") {
				alert("이미 사용하신 쿠폰입니다.");
				orderCount = 0;
			} else {
				alert("구매 신청이 취소되었습니다. 문의 해주시기 바랍니다.");
				orderCount = 0;
			}
		}, function (res) {
			alert("문제가 발생했습니다.");
		});
		
	});
	
	// 업그레이드키 확인
	$("#upgrade-check-btn").click(function (e) {
		e.preventDefault();
		
		var upgradeKey = $("#upgrade-key").val();
		if (!upgradeKey) {
			alert("라이선스 키가 입력되지 않았습니다.");
			$("#upgrade-key").focus();
			return;
        }
        
        // 공백확인
        var blankRegex = /[\s]/g;
        if (blankRegex.test(upgradeKey)) {
            alert("공백은 사용할 수 없습니다.");
            return;
        }
        var alphabetNumberRegex = /^[A-Za-z0-9+]*$/;
        if (!alphabetNumberRegex.test(upgradeKey)) {
            alert("영문, 숫자만 입력 가능합니다.");
            return;
        }
		
		var payload = {
			licenseKey : upgradeKey
		};

		ajaxCall("POST", "UpgradeCheckServlet", payload, function (info2) {
            var info = info2;
            if (typeof(info2) == "string") {
                info = JSON.parse(info2);
            }
			if (info.success){
				if (info.data.productVersion == info.data.serviceProductVersion){
                    isUpgrade = false;
					$("#upgrade-message").text("최신버전입니다.");
				} else if (info.data.newOrderNum != null) {
                    isUpgrade = false;
					$("#upgrade-message").text("이미 업그레이드 된 라이선스입니다.");
				} else {
                    orderDate = parseInt(info.data.orderNum.substr(0,8));
					quantity = info.data.quantity;
					orderNum = info.data.orderNum;
					telephone = info.data.telephone;
					name = info.data.name;
					mail = info.data.email;
					address = info.data.address;
					isUpgrade = true;
					if (orderDate > freeUpgradeLimit) {
						alert("무료 업그레이드 대상자입니다.\n\n발주를 진행해주시기 바랍니다.(구매수량은 자동으로 측정됩니다.)");
						$("#upgrade-message").text("무상 업그레이드 대상자입니다.");
						unitPrice = 0;
					} else {
						alert("무료 업그레이드 대상자가 아닙니다.");
						$("#upgrade-message").text("무료 업그레이드 대상자가 아닙니다.");
					}
                    $("#upgrade-copy-message").text("업그레이드 가능 수량 : " + quantity + " Copy");
                    
                    // 금액 계산
                    dr = computeUpgradeDiscountRate(quantity);
                    var disRate = dr * 100;
                    var disPrice = unitPrice * dr * quantity;
                    var orgPrice = unitPrice * quantity;
                    $(".up-copy").val(quantity);
                    $(".up-dis-rate").text(disRate + "%");
                    $(".up-dis-price").text(disPrice).digits();
                    $(".up-org-price").text(orgPrice).digits();
                    var totalPrice = orgPrice - disPrice;
                    // 부과세
                    var vat = totalPrice * 0.1;
                    var totalPrice2 = totalPrice + vat;
                    $(".up-tot-price").text(totalPrice2).digits();
                    //

                    // 발주서 정보
                    $(".up-company").val(name);
                    $(".up-telephone").val(telephone);
                    $(".up-email").val(mail);
                    $(".up-addr").val(address);
                    $(".up-old-number").val(orderNum);

                    // 팝업창 관련
                    $(".up-copy").text(quantity);
                    $(".up-p-dis-price").text(disRate + " % (- " + numberFormat(disPrice) + " 원)");
                    $(".up-p-tot-price").text(numberFormat(totalPrice) + " 원");
                    $(".up-p-vat").text("10 % (+ " + numberFormat(vat) + " 원)");
                    $(".up-p-tot-price2").text(numberFormat(totalPrice2) + " 원");
				}
			} else {
                isUpgrade = false;
				$("#upgrade-message").text("잘못된 라이선스 키입니다.");
			}
		}, function (res) {
			alert("문제가 발생했습니다.");
		});
    });
    
    // 업그레이드 견적
    $(".buy-btn-up").click(function (e) {
        e.preventDefault();

		var company = $("#up-company").val();
		var project = $("#up-project").val();
		var addr = $("#up-addr").val();
		var name = $("#up-name").val();
		var telephone = $("#up-telephone").val();
		var email = $("#up-email").val();
		var oldNumber = $("#up-old-number").val();
		var input_file = $("#input_file").val();
		var company2 = $("#up-company2").val();
		var name2 = $("#up-name2").val();
		var telephone2 = $("#up-telephone2").val();
        var email2 = $("#up-email2").val();

        $(".up-p-name").text(name);
        $(".up-p-telephone").text(telephone);
        $(".up-p-company").text(company);
        $(".up-p-email").text(email);
        $(".up-p-project").text(project);
        $(".up-p-name").text(name);

        $(".up-p-p").text(unitPrice).digits();
        
        if (!isUpgrade) return;
        callBpop('#pop-buy');
        
    });
    // 업그레이드 구매
    $(".reg-btn-up").click(function (e) {
        e.preventDefault();

		var company = $("#up-company").val();
		var project = $("#up-project").val();
		var addr = $("#up-addr").val();
		var name = $("#up-name").val();
		var telephone = $("#up-telephone").val();
		var email = $("#up-email").val();
		var oldNumber = $("#up-old-number").val();
		var input_file = $("#input_file").val();
		var company2 = $("#up-company2").val();
		var name2 = $("#up-name2").val();
		var telephone2 = $("#up-telephone2").val();
        var email2 = $("#up-email2").val();

        $(".up-p-name").text(name);
        $(".up-p-telephone").text(telephone);
        $(".up-p-company").text(company);
        $(".up-p-email").text(email);
        $(".up-p-project").text(project);
        $(".up-p-name").text(name);
        $(".up-p-addr").text(addr);
        $(".up-p-project").text(project);
        $(".up-p-company2").text(company2);
        $(".up-p-email2").text(email2);

        $(".up-p-p").text(unitPrice).digits();
        
        if (!isUpgrade) return;
        callBpop('#pop-reg');
    });

    // 업그레이드 견적 발송
    $(".buy-up-save-btn").click(function (e) {
        e.preventDefault();
        
        var copy = $(".up-copy").val();
        var company = $("#up-company").val();
		var project = $("#up-project").val();
		var addr = $("#up-addr").val();
		var name = $("#up-name").val();
		var telephone = $("#up-telephone").val();
		var email = $("#up-email").val();
		var oldNumber = $("#up-old-number").val();
		var input_file = $("#input_file").val();
		var company2 = $("#up-company2").val();
		var name2 = $("#up-name2").val();
		var telephone2 = $("#up-telephone2").val();
        var email2 = $("#up-email2").val();

        var payload = {
			"rec-quantity" : copy, 
			"rec-project-name" : project, 
			"rec-name" : name, 
			"rec-org" : company, 
			"rec-tel" : telephone, 
			"rec-mail" : email, 
			"cus-name" : name2, 
			"cus-org" : company2, 
			"cus-tel" : telephone2, 
			"cus-mail" : email2, 
			"purchase-type" : "normal",
			"lang" : "ko",
			"country" : "KR",
			"upgrade" : "true",
			"unitPrice" : unitPrice,
        };

		ajaxCall("POST", "payment/estimateProcess", payload, function (msg) {
			if(msg == "0000"){
				alert("견적서가 발송 되었습니다.");
				$('#pop-buy').bPopup().close();
			} else {
				alert("문제가 발생했습니다.");
			}
		}, function (res) {
			alert("문제가 발생했습니다.");
		});
    });

    // 업그레이드 구매 발송
    $(".reg-up-save-btn").click(function (e) {
        e.preventDefault();
        
        var copy = $(".up-copy").val();
        var company = $("#up-company").val();
		var project = $("#up-project").val();
		var addr = $("#up-addr").val();
		var name = $("#up-name").val();
		var telephone = $("#up-telephone").val();
		var email = $("#up-email").val();
		var oldNumber = $("#up-old-number").val();
		var input_file = $("#input_file").val();
		var company2 = $("#up-company2").val();
		var name2 = $("#up-name2").val();
		var telephone2 = $("#up-telephone2").val();
        var email2 = $("#up-email2").val();
        
		// 전화번호 자르기
		var tel = telephone.split("-");

		var formdata = new FormData();
		formdata.append("preOrderNum", oldNumber);
		formdata.append("isUpgrade", "true");
		formdata.append("unitPrice", unitPrice);
		formdata.append("sen-quantity", copy);
		formdata.append("sen-project", project);
		formdata.append("sen-company", company);
		formdata.append("sen-address", addr);
		formdata.append("sen-director", name);
		formdata.append("sen-name", name);
		formdata.append("sen-tel1", tel[0]);
		formdata.append("sen-tel2", tel[1]);
		formdata.append("sen-tel3", tel[2]);
		formdata.append("sen-mail", email);
		formdata.append("license-name", name2);
		formdata.append("license-mail", email2);
		formdata.append("sen-event-code",  "");
		formdata.append("sen-purchase-type", "normal");
		
		if ($("[name='v_file']").val()) {
			formdata.append('sen-file', $("[name='v_file']")[0].files[0]);
		}
        
		ajaxCall2("POST", "payment/orderProcess", formdata, function (msg) {
			if (msg == "0000") {
				alert("구매 신청이 완료되었습니다.\n안내 메일이 발송 되었습니다.");
				$('#pop-reg').bPopup().close();
			} else if (msg == "2100") {
				alert("파일 사이즈 2MB를 넘었습니다.");
				orderCount = 0;
			} else if (msg == "3001") {
				alert("쿠폰 코드가 일치하지 않습니다.");
				orderCount = 0;
			} else if (msg == "3002") {
				alert("이미 사용하신 쿠폰입니다.");
				orderCount = 0;
			} else {
				alert("구매 신청이 취소되었습니다. 문의 해주시기 바랍니다.");
				orderCount = 0;
			}
		}, function (res) {
			alert("문제가 발생했습니다.");
        });
        
        if (!isUpgrade) return;
        callBpop('#pop-reg');
    });
	
	// api call	
	function ajaxCall(method, url, payload, cb, eb) {
		$.ajax({
			type : method,
			datatype : 'json',
			url : BASE_URL + url,
			data : payload,
            beforeSend : function () {
                $("#loadingBg").addClass("show");
                $("#loadingBox").addClass("show");
            },
            success : function () {
                setTimeout(function () {
                    $("#loadingBg").removeClass("show");
                    $("#loadingBox").removeClass("show");
                }, 300);
            }
		}).done(cb).fail(eb);
	}	
	function ajaxCall2(method, url, payload, cb, eb) {
		$.ajax({
			type : method,
			url : BASE_URL + url,
			data : payload,
	        processData: false,
	        contentType: false,
            beforeSend : function () {
                $("#loadingBg").addClass("show");
                $("#loadingBox").addClass("show");
            },
            success : function () {
                setTimeout(function () {
                    $("#loadingBg").removeClass("show");
                    $("#loadingBox").removeClass("show");
                }, 300);
            }
		}).done(cb).fail(eb);
	}
	
	function validateMailAddress(mail) {
		var regExp = /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/;

		if (!regExp.test(mail)) {
			return false;
		}
		return true;
    }
    
    function validatePhoneNumber(phoneNumber) {
        var regExp = /([0-9]{2,3})-([0-9]{3,4})-([0-9]{4})$/;
        
		if (!regExp.test(phoneNumber)) {
			return false;
		}
		return true;
    }
    
    // 구매 할인
	function computeDiscountRate(copy) {
		//2015년 1월1일 시행
		if (isNaN(copy) || copy < 5 ) {
			return 0;
		} else if (copy < 10) {
			return 0.05;
		} else if (copy < 30) {
			return 0.1;
		}  else if (copy < 50) {
			return  0.15;
		} else if (copy < 100) {
			return 0.20;
		} else{
			return 0.3;
		}
    }
    
    // 업그레이드 할인    
    function computeUpgradeDiscountRate(upgradeCopy) {
        //2015년 1월1일 시행
        if (isNaN(upgradeCopy) || upgradeCopy < 5) {
            return 0;
        } else if (upgradeCopy < 10) {
            return 0.05;
        } else if (upgradeCopy < 30) {
            return 0.1;
        } else if (upgradeCopy < 50) {
            return 0.15;
        } else if (upgradeCopy < 100) {
            return 0.20;
        } else {
            return 0.3;
        }
    }

	$.fn.digits = function() {
		return this.each(function() {
			$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		});
	};
	
	function numberFormat(v) {
		return String(v).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	}
});