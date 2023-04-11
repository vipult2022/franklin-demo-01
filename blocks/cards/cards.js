import { createOptimizedPicture } from '../../scripts/lib-franklin.js';
import { fetchPlaceholders, getMetadata } from '../../scripts/lib-franklin.js'

export default async function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  const placeholders = await fetchPlaceholders('');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else {
        div.className = 'cards-card-body';
        const readMore = document.createElement('button')
        const rightArrow = document.createElement('i')
        rightArrow.className = 'gg-arrow-right-r'
        readMore.innerText = placeholders?.readMore
        readMore.append(rightArrow)
        div.append(readMore)
      }

    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}

