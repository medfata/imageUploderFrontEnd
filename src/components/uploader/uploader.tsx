import {Component, ChangeEvent} from "react";
interface IUploaderProps{
    file:File | null;
    onFileChange:Function;
}
interface IUploderState{
    imageUrl:string
}

export class Uploader extends Component<IUploaderProps,IUploderState>{
    constructor(props:IUploaderProps){
        super(props);
        this.state = {imageUrl:''};
        this.onFileChange = this.onFileChange.bind(this);
    }

    onFileChange(e:ChangeEvent<HTMLInputElement>){
        const file = e.currentTarget.files?.item(0);
        if(file){
            const fileUrl  = URL.createObjectURL(file);
            console.log("file url :", fileUrl)
            this.setState({imageUrl:fileUrl})
            setTimeout(() => this.props.onFileChange(file), 3000)
        }
        
    }
    render(): React.ReactNode {
        const imageUrl = this.state.imageUrl;
        return (
            <div className="imageUploader">
            <h4 style={{marginTop:'4px'}}>Upload your Image</h4>
            <p className="fileType" >File Sould be Jpeg, Png ...</p>
            {
                imageUrl == '' ?
                <div className="dragAndDrop">
                    <img style={{marginTop:'50px'}} src={'../../image.svg'} alt="Drag and Drop"></img>
                    <p className="fileType">Drag And Drop Your image here</p>
                </div> :
                 <div 
                 className='dragAndDrop imageBackground' 
                 style={{backgroundImage: `url(${imageUrl})`}}   >
                </div>

            }
            <p className="fileType" style={{fontSize:'small'}}>Or</p>
            <label htmlFor="file-upload" className="custom-file-upload">
                Choose a File
            </label>
            <input id="file-upload" type="file" onChange={this.onFileChange} />
        </div>
        )
    }
}