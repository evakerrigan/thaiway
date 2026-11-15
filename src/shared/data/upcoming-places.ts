/**
 * Места, про которые расскажу позже. Показываются на странице /places как заготовки.
 * Когда появится описание и фото — место можно перенести в полноценные данные (Place).
 */
export interface UpcomingPlace {
  id: string;
  name: string;
  region: string;
}

export const UPCOMING_PLACES: UpcomingPlace[] = [
  { id: 'pattaya-botanical-garden', name: 'Ботанический сад', region: 'Паттайя' },
  { id: 'robot-museum', name: 'Музей роботов', region: 'Между Бангкоком и Паттайей' },
  { id: 'ayutthaya', name: 'Аюттхая', region: 'Древняя столица Сиама' },
  { id: 'lopburi', name: 'Лопбури', region: 'Город обезьян' },
  { id: 'chiang-rai-tea-fields', name: 'Чайные поля', region: 'Чианграй' },
  { id: 'lumpini-park', name: 'Парк Люмпини', region: 'Бангкок' },
  { id: 'benjakitti-park', name: 'Парк Бенджакити', region: 'Бангкок' },
  { id: 'lang-suan-hotel-courtyard', name: 'Дворик отеля с современной архитектурой', region: 'Бангкок, Lang Suan Rd' },
];
