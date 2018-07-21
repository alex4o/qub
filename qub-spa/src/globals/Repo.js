import ResearchList from "../states/ResearchList"
import Research from "../states/Research"

let repo = new ResearchList()

let res = new Research();

res.id = "0xFAD34F43434485684586"
res.isLocked = true
res.paperURL = "https://arxiv.org/pdf/astro-ph/9806002.pdf"
res.reproducedURL = "https://arxiv.org/pdf/astro-ph/9806002.pdf"
res.reproducerID = "0000-0002-9079-593X"
res.researcherID = "0000-0002-9079-593X"
res.stakedAmount = 200
res.stakers = 4
res.state = 2
res.votes = []
res.title = "SECULAR EVOLUTION OF BARRED GALAXIES WITH MASSIVE CENTRAL BLACK HOLES"
res.loadFromOrcID()

repo.researches.push(res)

res = new Research();

res.id = "0xFAD34F43434485684586"
res.isLocked = false
res.paperURL = "https://arxiv.org/pdf/astro-ph/9806002.pdf"
res.reproducedURL = "https://arxiv.org/pdf/1707.07702.pdf"
res.reproducer = "Ivan petrov"
res.researcher = "Georgi Dimitrov"
res.stakedAmount = 200
res.stakers = 4
res.state = 2
res.votes = []
res.title = "SECULAR EVOLUTION OF BARRED GALAXIES WITH MASSIVE CENTRAL BLACK HOLES"
repo.researches.push(res)

res = new Research();


res.id = "0xFAD34CCD3434485684586"
res.isLocked = false
res.paperURL = "https://arxiv.org/pdf/1707.07702.pdf"
res.reproducedURL = "https://arxiv.org/pdf/1707.07702.pdf"
res.reproducerID = "0000-0002-3704-5398"
res.researcherID = "0000-0002-9079-593X"
res.stakedAmount = 200
res.stakers = 4
res.state = 1
res.votes = []
res.title = "A Smooth Exit from Eternal Inflation?"
res.loadFromOrcID()

repo.researches.push(res)

res = new Research();

res.id = "0xFAD34CCD3434485684586"
res.isLocked = false
res.paperURL = "https://arxiv.org/pdf/1701.08110.pdf"
res.reproducedURL = ""
res.researcherID = "0000-0002-9079-593X"
res.reproducerID = "0000-0002-3704-5398"
res.stakedAmount = 800
res.stakers = 6
res.state = 0
res.votes = []
res.title = "The Conformal BMS Group"
res.loadFromOrcID()

repo.researches.push(res)

export default repo