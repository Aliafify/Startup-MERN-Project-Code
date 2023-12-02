// serialize form data
export function serializeFormData(e){
    const formData = new FormData(e.target);
    let currentFormData ={} 
    for (const entry of formData) {
        const [key, value] = entry;
        console.log(`${key}: ${value}`);
        currentFormData[key] = value;
    }
    console.log(formData)
    return currentFormData;
  
  }