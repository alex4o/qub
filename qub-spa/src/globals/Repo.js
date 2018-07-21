import ResearchList from "../states/ResearchList"
import Research from "../states/Research"

let repo = new ResearchList()


let res = new Research();

res.id = "0xFAD34F43434485684586"
res.isLocked = false
res.paperURL = "url.paper"
res.reproducedURL = "reproducted://asdfasd"
res.reproducer = "Ivan petrov"
res.researcher = "Georgi Dimitrov"
res.stakedAmount = 200
res.stakers = 4
res.state = 1
res.votes = []

repo.researches.push(res)

export default repo