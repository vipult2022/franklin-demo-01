import { fetchData } from "../../scripts/utils"

export default async function decorate(block) {
    console.log('asdfasdf')
    const obj = {
        title: '',
        json: ''
    }
    const data = await fetchData('news', {
        limit: 10
    })

    console.log({data})
    // const div = document.createElement('div');
    // [...block.children].forEach((row) => {
    //     const teaserDiv = document.createElement('div');
    //     teaserDiv.className = 'teaser-block'
    //     teaserDiv.innerHTML = row.innerHTML;
    //     [...teaserDiv.children].forEach((ele) => {
    //         if (ele.children.length === 1 && ele.querySelector('picture')) ele.className = 'teaser-block_image';
    //         else ele.className = 'teaser-block_body';
    //     })
    //     div.append(teaserDiv)
    // })
    // console.log({teaser: div})
    // block.textContent = '';
    // block.append(div);
}