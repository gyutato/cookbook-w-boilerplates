import React, { useState, useRef } from 'react';

function InputSample() {
	const [inputs, setInputs] = useState({
		name: '',
		nickname: '',
	});
	const nameInput = useRef(); // Ref 객체를 만들어 nameInput 변수에 할당한다.
	const { name, nickname } = inputs;

	const onChange = (e) => {
		const {value, name} = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	}

	const onReset = () => {
		setInputs({
			name: '',
			nickname: '',
		});
		nameInput.current.focus(); // nameInput 즉 Ref 객체의 .current에 focus를 준다.
	}

	return (
		<div>
			<input
				name="name"
				placeholder="이름"
				onChange={onChange}
				value={name}
				ref={nameInput} // focus를 주려는 DOM에 ref 값으로 Ref 객체를 설정하면 된다.
			/>
			<input
				name="nickname"
				placeholder="닉네임"
				onChange={onChange}
				value={nickname}
			/>
			<button onClick={onReset}>초기화</button>
			<div>
				<b>값: </b>
				{name} ({nickname})
			</div>
		</div>
	);
}

export default InputSample;