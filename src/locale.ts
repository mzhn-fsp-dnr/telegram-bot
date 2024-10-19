type Locale = Record<string, string>;

const locale = {
  message_welcome:
    "Добро пожаловать в систему электронного бронирования Почты Донбасса.\n\nЗдесь Вы можете записаться заранее для посещения отделения.",
  message_not_authorized:
    "Вы не авторизованы в системе!\n\nДля регистрации в системе электронного бронирования Вам необходимо посетить отделение Почты Донбасса.",
  message_choose_org: "Выберите организацию",
  message_choose_service: "Выберите необходимую услугу\n\n%category%",
  message_choose_date: "Введите дату для бронирования\n\nНапример: 01.11.2024",
  message_choose_time: "Выбрана дата: %date%\n\nВыберите время:",
  message_success:
    "Вы забронировали талон на %date% в %time%.\nНомер брони: %code%\n\nСохраните этот номер, он Вам понадобится для получения талона!",
  message_invalid_date:
    "Неверная дата. Повторите попытку.\n\nЗабронировать посещение можно не более, чем на 14 дней вперед. Бронирование на сегодня не допускается.",
} satisfies Locale;
type AvailableLocaleKeys = keyof typeof locale;

/** Get localized string by translation key */
export const _ = (
  key: AvailableLocaleKeys,
  replacements?: Record<string, any>
) => {
  if (key in locale) {
    let val = locale[key];
    if (!replacements) return val;
    for (const [key, value] of Object.entries(replacements)) {
      val = val.replace(`%${key}%`, value);
    }
    return val;
  }
  throw new Error(`Unknown locale key: ${key}`);
};
