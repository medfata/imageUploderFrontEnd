import { Component, ReactNode } from "react";

interface IDownloaderProps{
    image:File | null;
}

export class Downloader extends Component<IDownloaderProps,any > {
    constructor(props:IDownloaderProps){
        super(props);
    }

    render(): ReactNode {
        const imageUrl = this.props.image ? URL.createObjectURL(this.props.image) : '';
        return (
            <div className="imageUploader" >
            <h4 style={{marginBottom:'4px'}}>Uploaded Successfully!</h4>
            <div className="imageContainer" style={{backgroundImage: `url('${imageUrl}')`}} >
        
            </div>
            <div className="imageLink">
              <input type="text" disabled  name="url" value={imageUrl} />
              <button  className="copyLink">copy Link</button>
            </div>
            <button className="copyLink" style={{margin:'auto'}} >
            Go back
            </button >
        </div >
        )
    }
}