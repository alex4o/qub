import ResearchList from "../states/ResearchList"
import Research from "../states/Research"

let repo = new ResearchList()


let res = new Research();

res.id = "0xFAD34F43434485684586"
res.isLocked = true
res.paperURL = "https://arxiv.org/pdf/astro-ph/9806002.pdf"
res.reproducedURL = "https://arxiv.org/pdf/astro-ph/9806002.pdf"
res.reproducer = "Ivan petrov"
res.researcher = "Georgi Dimitrov"
res.stakedAmount = 200
res.stakers = 4
res.state = 2
res.votes = []

repo.researches.push(res)

res = new Research();

res.id = "0xFAD34CCD3434485684586"
res.isLocked = false
res.paperURL = "https://arxiv.org/pdf/1707.07702.pdf"
res.reproducedURL = "https://arxiv.org/pdf/1707.07702.pdf"
res.reproducer = "Steven Hawking"
res.researcher = "Georgi Dimitrov"
res.stakedAmount = 200
res.stakers = 4
res.state = 1
res.votes = []

repo.researches.push(res)

res = new Research();

res.id = "0xFAD34CCD3434485684586"
res.isLocked = false
res.paperURL = "https://arxiv.org/pdf/1701.08110.pdf"
res.reproducedURL = ""
res.reproducer = "Steven Hawking"
res.researcher = ""
res.stakedAmount = 800
res.stakers = 6
res.state = 0
res.votes = []

repo.researches.push(res)

export default repo