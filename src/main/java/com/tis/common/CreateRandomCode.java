package com.tis.common;

public class CreateRandomCode {
	public String createRandomCode() {
		char chr1=(char)((Math.random()*25)+66);
		char chr2=(char)((Math.random()*25)+66);
		char chr3=(char)((Math.random()*25)+66);
		char chr4=(char)((Math.random()*25)+66);
		char chr5=(char)((Math.random()*10)+48);
		char chr6=(char)((Math.random()*10)+48);
		char chr7=(char)((Math.random()*10)+48);
		char chr8=(char)((Math.random()*10)+48);
		
        String str1=Character.toString(chr1);
        String str2=Character.toString(chr2);
        String str3=Character.toString(chr3);
        String str4=Character.toString(chr4);
        String str5=Character.toString(chr5);
        String str6=Character.toString(chr6);
        String str7=Character.toString(chr7);
        String str8=Character.toString(chr8);
        
		String code=str1+str2+str3+str4+str5+str6+str7+str8;
		System.out.println(code);

		return code;
	}
}

