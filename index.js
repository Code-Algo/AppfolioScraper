const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const base = 'https://finance.yahoo.com'

const url = 'https://finance.yahoo.com/etfs/?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAANKBjYg0zM_n5aZCzgDGVj_qX06nBpyQ-r23c2OudoCBtIa46H9iB8dUpjK3H0VCIdT7_mQ2MdttS-NSAktVfXJ5pltzBMgOA0XQ5bVWIyK0Hf4rh4Trd8TWa2PiAGwC4YAJqvJdm8oM_y1yCMEmXlBrm53ZHqnH882nb_RmDu3W&offset=0&count=100'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const etfs = []

        $('[class*="simpTblRow Bgc($hoverBgColor):h"]').each(function () {
            const href = $(this).find('a').attr('href')
            const title = $(this).find('a').attr('title')

            etfs.push({
                title,
                href: base + href
            })
            console.log(etfs)
        })
    })

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

