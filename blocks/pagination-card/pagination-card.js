import { fetchData } from "../../scripts/utils.js"

const createHtml = (response) => {
    const div = document.createElement('div')
    response?.data.forEach((ele) => {
        const cardDiv = document.createElement('div');
        const textDiv = document.createElement('div');
        const imgDiv = document.createElement('div');
        cardDiv.className = 'p-card'
        textDiv.className = 'p-text-block'
        imgDiv.className = 'p-img-block'
        const title = document.createElement('h4');
        const desc = document.createElement('p')
        const img = document.createElement('img');
        title.textContent = ele.title
        desc.textContent = ele.description
        img.src = ele.thumbnail
        textDiv.append(title)
        textDiv.append(desc)
        imgDiv.append(img)
        cardDiv.append(textDiv)
        cardDiv.append(imgDiv)
        div.append(cardDiv)
    })
    return { div }
}

const updateConfig = (updatedObj) => {
    const oldConfig = document?.vipul?.block.paginationCard.config
    document.vipul = {
        block: {
            paginationCard: {
                config: {
                    ...oldConfig,
                    ...updatedObj
                }
            }
        }
    };
}

const handleClick = async (block, isNext) => {
    console.log({block})
    console.log('clicked')
    let { offset, limit, json } = document?.vipul?.block.paginationCard.config
    offset = isNext ? offset + limit : offset - limit
    console.log({
        limit: limit,
        offset
    })
    const response = await fetchData(json, {
        limit: limit,
        offset
    })
    updateConfig({offset})
    console.log({response, offset})
    const { div } = createHtml(response)
    const { paginationDiv } = createPaginationBlock(response, block)

    block.textContent = '';
    block.append(div);
    block.append(paginationDiv);
}

const createPaginationBlock = (response, block, obj) => {
    const paginationDiv = document.createElement('div')
    paginationDiv.className = 'pagination-block'
    const prevDiv = document.createElement('button')
    prevDiv.textContent = 'Previous'
    const nextDiv = document.createElement('button')
    nextDiv.textContent = 'Next'

    const {offset, limit, total } = response
    if (offset === 0) prevDiv.disabled = true;
    if (offset + limit >= total) nextDiv.disabled = true;

    paginationDiv.append(prevDiv)
    paginationDiv.append(nextDiv)

    nextDiv.addEventListener('click', async () => handleClick(block, true))
    prevDiv.addEventListener('click', async () => handleClick(block, false))

    return {
        paginationDiv,
        nextDiv,
        prevDiv
    }

}

export default async function decorate(block) {
    const obj = {
            title: '',
            json: '',
            limit: 2,
            offset: 0
    };
    
    [...block.children].forEach((row) => {
        obj.title = row.children[0].textContent
        obj.json = row.children[1].textContent
        obj.limit = row.children[2].textContent
    })
    document.vipul = {
        block: {
            paginationCard: {
                config: {
                    ...obj
                }
            }
        }
    };

    const response = await fetchData(obj.json, {
        limit: obj.limit,
        offset: obj.offset
    })
    const { div } = createHtml(response)

    // pagination
    const { paginationDiv, nextDiv, prevDiv } = createPaginationBlock(response, block, obj)

    // nextDiv.addEventListener('click', async () => {
    //     console.log('clicked')
    //     const offset = obj.offset + obj.limit
    //     const response = await fetchData(obj.json, {
    //         limit: obj.limit,
    //         offset
    //     })

    //     const { div } = createHtml(response)
    //     const { paginationDiv} = createPaginationBlock(response)

    //     block.textContent = '';
    //     block.append(div);
    //     block.append(paginationDiv);
    // })




    block.textContent = '';
    block.append(div);
    block.append(paginationDiv);

}