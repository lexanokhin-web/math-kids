import { extendedSentences } from '../utils/syllablesData';
import ReadingViewTemplate from './ReadingViewTemplate';

const ExtendedSentencesView = () => {
    return (
        <ReadingViewTemplate 
            data={extendedSentences} 
            title="Extended Sentences" 
            storageKey="mathkids_reading_font_size"
            defaultFontSize={2.2}
        />
    );
};

export default ExtendedSentencesView;
