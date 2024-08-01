const DatePicker = ({ value, onChange }) => {
    return (
        <input 
        className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        type="date" 
        onChange={onChange}
        value={value}
        required
        />
    )
    }


export default DatePicker;