// Добавляет универсальности pug-миксинам,
// позволяет выделить необходимые слова заголовков и текстовых блоков в теги
// для дальнейшей стилизации
// ! Не тестировала с текстом, где есть повторы слов
// ! Следуя логике обернет в тег каждое слово, поправить

function insertTag(element, word, tag, className = '') {
  const content = element.textContent.split(' ');
  element.textContent = '';

  const newContent = [];

  content.forEach((item) => {
    if (item !== word) newContent.push(item);
    else if (tag !== 'br') newContent.push(`<${tag} ${(className !== '') ? `class = ${className}` : ''}>`, item, `</${tag}>`);
    else newContent.push(item, '<br/>');
  });

  return newContent.join(' ');
}

export default {
  insertTag,
};
