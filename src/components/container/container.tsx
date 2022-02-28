import axios from "axios";
import { Component, ReactNode } from "react";
import { Downloader } from "../downloader/donwloader";
import { Uploader } from "../uploader/uploader";
import { Uploading } from "../uploading/uploading";

interface IContainerState{
    file:File | null;
    isUploading:boolean;
    uploaded:boolean;
}
const initContainerState = {
    file:null,
    isUploading:false,
    uploaded:false,
}

export class Container extends Component<any, IContainerState>{
    
    constructor(props:any){
        super(props);
        this.state = {...initContainerState};
        this.onFileChange = this.onFileChange.bind(this);
    }

    sendPostReq(file:File){
        if(file){
            const formData = new FormData();
            formData.append('file', file);
            axios.post('http://localhost:8080/upload', formData)
            .then(res => {
                const imageUrl = res.data;
                this.setState({file,isUploading:false, uploaded:true})
            })
            .catch(err => {
                console.log('post error :',err);
                this.setState({isUploading:false, uploaded:false})
            })
        }
    }

    onFileChange(file:File){
        this.setState({file,isUploading:true, uploaded:false})
        setTimeout(() =>this.sendPostReq(file),3000)
    }
    
    render(): ReactNode {
        const image = this.state.file;
        return (
            <div>
            {
                this.state.isUploading ? 
                <Uploading />   :
                (this.state.uploaded ? 
                    <Downloader image={image} /> :
                    <Uploader file={this.state.file} onFileChange={this.onFileChange}></Uploader>
                )
            }
            </div>
        )
    }
}