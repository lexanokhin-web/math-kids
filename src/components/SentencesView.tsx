import { lolaSentences } from '../utils/syllablesData';
import ReadingViewTemplate from './ReadingViewTemplate';

const SentencesView = () => {
    return (
        <ReadingViewTemplate 
            data={lolaSentences} 
            title="Sentences (Lola)" 
            storageKey="mathkids_reading_font_size"
            defaultFontSize={3.0}
        />
    );
};

export default SentencesView;
