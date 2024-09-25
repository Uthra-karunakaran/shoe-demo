import { HexColorPicker } from "react-colorful"
import State from './State';
import { proxy,useSnapshot } from "valtio"

function Picker(){
    const snap=useSnapshot(State);
    // const [color,setColor]=useState('#fffff')
    return(
      <div className="picker" style={{display:snap.current ? "block" :"none"}}>
        <HexColorPicker color={snap.items[snap.current]} onChange={(color)=>(State.items[snap.current]=color)} />
      </div>
    )
  }

export default Picker;