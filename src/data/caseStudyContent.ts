// Raw markdown imports — Vite ?raw suffix bundles the file contents as strings at build time.
// fullMd = full case study (web.md); shortMd = preview card copy (web-short.md or same file if no short version exists).

import psaFull from '../content/case-studies/01-PSA-Peugeot/web.md?raw';
import psaShort from '../content/case-studies/01-PSA-Peugeot/web-short.md?raw';

import renaultFull from '../content/case-studies/02-Renault/web.md?raw';
import renaultShort from '../content/case-studies/02-Renault/web-short.md?raw';

import glovoCanceledFull from '../content/case-studies/03-Glovo/canceled-order.md?raw';
import glovoCanceledShort from '../content/case-studies/03-Glovo/canceled-order-short.md?raw';

import glovoCustomerAbsentFull from '../content/case-studies/03-Glovo/customer-absent.md?raw';
import glovoCustomerAbsentShort from '../content/case-studies/03-Glovo/customer-absent-short.md?raw';

import glovoNoteTakingFull from '../content/case-studies/03-Glovo/note-taking.md?raw';
import glovoNoteTakingShort from '../content/case-studies/03-Glovo/note-taking-short.md?raw';

import glovoUnhappyPathFull from '../content/case-studies/03-Glovo/unhappy-path.md?raw';
import glovoUnhappyPathShort from '../content/case-studies/03-Glovo/unhappy-path-short.md?raw';

import glovoCourierSupportFull from '../content/case-studies/03-Glovo/web.md?raw';
import glovoCourierSupportShort from '../content/case-studies/03-Glovo/web-short.md?raw';

import hpBundlesFull from '../content/case-studies/04-HP/bundles.md?raw';
import hpBundlesShort from '../content/case-studies/04-HP/bundles-short.md?raw';

import hpCrossSellFull from '../content/case-studies/04-HP/cross-sell.md?raw';
import hpCrossSellShort from '../content/case-studies/04-HP/cross-sell-short.md?raw';

import hpCustomizationFull from '../content/case-studies/04-HP/customization.md?raw';
import hpCustomizationShort from '../content/case-studies/04-HP/customization-short.md?raw';

import hpFinancingEvalFull from '../content/case-studies/04-HP/financing-evaluation.md?raw';
import hpFinancingEvalShort from '../content/case-studies/04-HP/financing-evaluation-short.md?raw';

import hpLoginIndiaFull from '../content/case-studies/04-HP/login-india.md?raw';
import hpLoginIndiaShort from '../content/case-studies/04-HP/login-india-short.md?raw';

import hpPrinterChoiceFull from '../content/case-studies/04-HP/printer-choice.md?raw';
import hpPrinterChoiceShort from '../content/case-studies/04-HP/printer-choice-short.md?raw';

import hpPromotionsIndiaFull from '../content/case-studies/04-HP/promotions-india.md?raw';
import hpPromotionsIndiaShort from '../content/case-studies/04-HP/promotions-india-short.md?raw';

import hpRatingsReviewsFull from '../content/case-studies/04-HP/ratings-reviews.md?raw';
import hpRatingsReviewsShort from '../content/case-studies/04-HP/ratings-reviews-short.md?raw';

import hpRegistrationFull from '../content/case-studies/04-HP/registration.md?raw';
import hpRegistrationShort from '../content/case-studies/04-HP/registration-short.md?raw';

import hpReturnsUkFull from '../content/case-studies/04-HP/returns-uk.md?raw';
import hpReturnsUkShort from '../content/case-studies/04-HP/returns-uk-short.md?raw';

import hpSubscriptionsFull from '../content/case-studies/04-HP/subscriptions.md?raw';
import hpSubscriptionsShort from '../content/case-studies/04-HP/subscriptions-short.md?raw';

import hpEcommerceFull from '../content/case-studies/04-HP/web.md?raw';
import hpEcommerceShort from '../content/case-studies/04-HP/web-short.md?raw';

import andrewAvatarFull from '../content/case-studies/05-Automation/andrew-avatar-video.md?raw';
import andrewSleeplessFull from '../content/case-studies/05-Automation/andrew-sleepless-video.md?raw';
import justinFileIngestionFull from '../content/case-studies/05-Automation/justin-file-ingestion.md?raw';
import leadScoringFull from '../content/case-studies/05-Automation/lead-scoring.md?raw';
import soundjourneyAudioFull from '../content/case-studies/05-Automation/soundjourney-audio.md?raw';
import vdChatbotFull from '../content/case-studies/05-Automation/vd-chatbot.md?raw';
import vdInternalFormFull from '../content/case-studies/05-Automation/vd-internal-form.md?raw';
import vdMeetingMinutesFull from '../content/case-studies/05-Automation/vd-meeting-minutes.md?raw';
import vdVisualFormFull from '../content/case-studies/05-Automation/vd-visual-form.md?raw';
import vdAutomationSuiteFull from '../content/case-studies/05-Automation/web.md?raw';
import vdAutomationSuiteShort from '../content/case-studies/05-Automation/web-short.md?raw';
import weopClickupRoutingFull from '../content/case-studies/05-Automation/weop-clickup-routing.md?raw';
import weopClickupTasksFull from '../content/case-studies/05-Automation/weop-clickup-tasks.md?raw';

import momentumFull from '../content/case-studies/06-Momentum/web.md?raw';
import momentumShort from '../content/case-studies/06-Momentum/web-short.md?raw';

import soundjourneyProductFull from '../content/case-studies/07-SoundJourney/web.md?raw';
import soundjourneyProductShort from '../content/case-studies/07-SoundJourney/web-short.md?raw';

export const caseStudyMap: Record<string, { fullMd: string; shortMd: string }> = {
  'psa-peugeot-neural-up':     { fullMd: psaFull,                   shortMd: psaShort },
  'renault-ai-living':         { fullMd: renaultFull,               shortMd: renaultShort },
  'glovo-canceled-order':      { fullMd: glovoCanceledFull,         shortMd: glovoCanceledShort },
  'glovo-customer-absent':     { fullMd: glovoCustomerAbsentFull,   shortMd: glovoCustomerAbsentShort },
  'glovo-note-taking':         { fullMd: glovoNoteTakingFull,       shortMd: glovoNoteTakingShort },
  'glovo-unhappy-path':        { fullMd: glovoUnhappyPathFull,      shortMd: glovoUnhappyPathShort },
  'glovo-courier-support':     { fullMd: glovoCourierSupportFull,   shortMd: glovoCourierSupportShort },
  'hp-bundles':                { fullMd: hpBundlesFull,             shortMd: hpBundlesShort },
  'hp-cross-sell':             { fullMd: hpCrossSellFull,           shortMd: hpCrossSellShort },
  'hp-customization':          { fullMd: hpCustomizationFull,       shortMd: hpCustomizationShort },
  'hp-financing-evaluation':   { fullMd: hpFinancingEvalFull,       shortMd: hpFinancingEvalShort },
  'hp-login-india':            { fullMd: hpLoginIndiaFull,          shortMd: hpLoginIndiaShort },
  'hp-printer-choice':         { fullMd: hpPrinterChoiceFull,       shortMd: hpPrinterChoiceShort },
  'hp-promotions-india':       { fullMd: hpPromotionsIndiaFull,     shortMd: hpPromotionsIndiaShort },
  'hp-ratings-reviews':        { fullMd: hpRatingsReviewsFull,      shortMd: hpRatingsReviewsShort },
  'hp-registration':           { fullMd: hpRegistrationFull,        shortMd: hpRegistrationShort },
  'hp-returns-uk':             { fullMd: hpReturnsUkFull,           shortMd: hpReturnsUkShort },
  'hp-subscriptions':          { fullMd: hpSubscriptionsFull,       shortMd: hpSubscriptionsShort },
  'hp-ecommerce':              { fullMd: hpEcommerceFull,           shortMd: hpEcommerceShort },
  'andrew-avatar-video':       { fullMd: andrewAvatarFull,          shortMd: andrewAvatarFull },
  'andrew-sleepless-video':    { fullMd: andrewSleeplessFull,       shortMd: andrewSleeplessFull },
  'justin-file-ingestion':     { fullMd: justinFileIngestionFull,   shortMd: justinFileIngestionFull },
  'lead-scoring':              { fullMd: leadScoringFull,           shortMd: leadScoringFull },
  'soundjourney-audio':        { fullMd: soundjourneyAudioFull,     shortMd: soundjourneyAudioFull },
  'vd-chatbot':                { fullMd: vdChatbotFull,             shortMd: vdChatbotFull },
  'vd-internal-form':          { fullMd: vdInternalFormFull,        shortMd: vdInternalFormFull },
  'vd-meeting-minutes':        { fullMd: vdMeetingMinutesFull,      shortMd: vdMeetingMinutesFull },
  'vd-visual-form':            { fullMd: vdVisualFormFull,          shortMd: vdVisualFormFull },
  'vd-automation-suite':       { fullMd: vdAutomationSuiteFull,     shortMd: vdAutomationSuiteShort },
  'weop-clickup-routing':      { fullMd: weopClickupRoutingFull,    shortMd: weopClickupRoutingFull },
  'weop-clickup-tasks':        { fullMd: weopClickupTasksFull,      shortMd: weopClickupTasksFull },
  'momentum-app':              { fullMd: momentumFull,              shortMd: momentumShort },
  'soundjourney-product':      { fullMd: soundjourneyProductFull,   shortMd: soundjourneyProductShort },
};
