const firstNicknames: string[] = [
  '예쁘게',
  '멋지게',
  '아름답게',
  '활기차게',
  '유쾌하게',
  '신나게',
  '사랑스럽게',
  '흥겹게',
  '힘차게',
  '자연스럽게',
  '밝게',
  '화려하게',
  '눈부시게',
  '신비롭게',
  '능숙하게',
  '희망차게',
  '부드럽게',
  '쾌활하게',
];
const secondNicknames: string[] = [
  '웃는',
  '미소짓는',
  '뛰어다니는',
  '날아다니는',
  '춤추는',
  '노래하는',
  '연주하는',
  '운동하는',
  '탐험하는',
  '꿈꾸는',
  '소통하는',
  '요리하는',
  '상상하는',
  '연구하는',
  '생각하는',
];

const thirdNicknames: string[] = [
  '너구리',
  '코알라',
  '기린',
  '두루미',
  '앵무새',
  '펭귄',
  '캥거루',
  '고슴도치',
  '나비',
  '바다사자',
  '바다거북',
  '코끼리',
  '하마',
  '돌고래',
  '사슴',
  '낙타',
  '다람쥐',
  '타조',
  '코뿔소',
  '개구리',
  '악어',
  '토끼',
];

const getRendomStringFromArray = (array: string[]): string => {
  if (array.length === 0) {
    return '';
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const getRandomNickname = (): string => {
  const first = getRendomStringFromArray(firstNicknames);
  const second = getRendomStringFromArray(secondNicknames);
  const third = getRendomStringFromArray(thirdNicknames);

  return `${first} ${second} ${third}`;
};

export default getRandomNickname;
