import React, { useState } from 'react';

const SeoArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-[#0f172a]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden transition-all duration-500 mt-12">
            
            {/* Header is always visible */}
            <div className="p-6 md:p-10 border-b border-gray-700/50">
                {/* Changed to H2 for SEO Hierarchy (Main H1 is in App.tsx) */}
                <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 mb-4">
                    The Ultimate Guide to Voter Registration & Civic Engagement
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">Comprehensive Guide</span>
                    <span>By <strong className="text-white">HSINI MOHAMED</strong></span>
                    <span className="hidden md:inline">• Updated Oct 2023</span>
                </div>
            </div>

            <div className="p-6 md:p-10 pt-2">
                {/* Collapsible Content Container */}
                <div className={`relative transition-all duration-700 ease-in-out ${!isExpanded ? 'max-h-20 overflow-hidden' : 'max-h-[5000px] opacity-100'}`}>
                    
                    <article className="prose prose-invert prose-lg max-w-none text-gray-300 prose-headings:font-bold prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-brand-gold prose-li:marker:text-brand-gold">
                        
                        <p className="lead text-xl text-gray-100 mb-8 font-light leading-relaxed">
                            Voter registration is the absolute bedrock of a functioning republic. It ensures that every eligible citizen has the distinct opportunity to cast a ballot and make their voice heard in the halls of power.
                        </p>

                        {/* Table of Contents */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 my-10 shadow-inner">
                            <h2 id="toc" className="text-2xl font-bold mt-0 text-brand-gold mb-6 border-b border-gray-700 pb-2">Table of Contents</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 mt-4 text-base font-medium list-none pl-0">
                                <li><a href="#why-register" className="flex items-center hover:translate-x-2 transition-transform"><span className="text-blue-500 mr-2">01.</span> Why Registration Matters</a></li>
                                <li><a href="#eligibility" className="flex items-center hover:translate-x-2 transition-transform"><span className="text-blue-500 mr-2">02.</span> Eligibility Requirements</a></li>
                                <li><a href="#how-to-register" className="flex items-center hover:translate-x-2 transition-transform"><span className="text-blue-500 mr-2">03.</span> Step-by-Step Registration</a></li>
                                <li><a href="#deadlines" className="flex items-center hover:translate-x-2 transition-transform"><span className="text-blue-500 mr-2">04.</span> Critical Deadlines</a></li>
                                <li><a href="#voter-id" className="flex items-center hover:translate-x-2 transition-transform"><span className="text-blue-500 mr-2">05.</span> Voter ID Laws Explained</a></li>
                                <li><a href="#myths" className="flex items-center hover:translate-x-2 transition-transform"><span className="text-blue-500 mr-2">06.</span> Debunking Myths</a></li>
                                <li><a href="#integrity" className="flex items-center hover:translate-x-2 transition-transform"><span className="text-blue-500 mr-2">07.</span> Election Integrity</a></li>
                                <li><a href="#faq" className="flex items-center hover:translate-x-2 transition-transform"><span className="text-blue-500 mr-2">08.</span> FAQ</a></li>
                            </ul>
                        </div>
                        
                        <h2 id="why-register" className="text-3xl mt-12">1. Why Voter Registration is a Pillar of Democracy</h2>
                        <p>At its core, voter registration is the administrative process by which citizens enroll with a government authority to become eligible to vote. While it may seem like a bureaucratic hurdle, it serves fundamental purposes that uphold the integrity of the democratic process.</p>
                        <p>Firstly, <strong>verification of eligibility</strong> is paramount. To vote in the United States, you must be a citizen, meet residency requirements, and be at least 18 years old. Registration confirms these qualifications, preventing ineligible individuals—and foreign entities—from influencing domestic policy.</p>
                        <p>Secondly, it facilitates <strong>logistical planning</strong>. Election administrators use voter rolls to determine how many ballots to print, how many voting machines to deploy, and where to establish polling places. Accurate data prevents long lines and disenfranchisement on Election Day.</p>

                        <h2 id="eligibility" className="text-3xl mt-12">2. Who Can Register to Vote?</h2>
                        <p>While specific laws vary by state (as election administration is a state power under the Constitution), the federal baseline requires that you are:</p>
                        <ul>
                            <li>A U.S. citizen (either by birth or naturalization).</li>
                            <li>At least 18 years old on or before Election Day.</li>
                            <li>A resident of the state and precinct where you are registering.</li>
                        </ul>
                        <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 my-6">
                            <p className="m-0 text-sm"><strong>Note on Criminal Records:</strong> A common misconception is that a felony conviction permanently bars you from voting. In reality, in most states, your rights are restored automatically after serving your time (incarceration, parole, and probation). Only a few states have permanent disenfranchisement laws. Always check your local Secretary of State website.</p>
                        </div>

                        <h2 id="how-to-register" className="text-3xl mt-12">3. How to Register: A Step-by-Step Guide</h2>
                        <p>In the digital age, registering has never been easier. There are three primary methods:</p>
                        
                        <h3 className="text-xl text-blue-300 mt-6">A. Online Registration</h3>
                        <p>Currently, 42 states and the District of Columbia offer online voter registration. This is the fastest method. You will generally need a state-issued driver's license or non-driver ID card to complete the process digitally, as the system uses the signature on file with the DMV.</p>

                        <h3 className="text-xl text-blue-300 mt-6">B. By Mail</h3>
                        <p>You can download the National Mail Voter Registration Form, available in multiple languages. Fill it out, sign it, and mail it to your state or local election office. This is an excellent option if you do not have a state-issued ID, as you can often use the last four digits of your Social Security number.</p>

                        <h3 className="text-xl text-blue-300 mt-6">C. In-Person</h3>
                        <p>You can register at your local election office, the Department of Motor Vehicles (DMV), and often at public assistance agencies or armed forces recruitment centers.</p>

                        <h2 id="deadlines" className="text-3xl mt-12">4. Understanding Voter Registration Deadlines</h2>
                        <p>One of the biggest barriers to participation is the registration deadline. Missing this date means you cannot vote in the upcoming election, even if you are otherwise eligible.</p>
                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <li className="bg-gray-800 p-4 rounded-lg">
                                <strong className="block text-brand-gold text-lg mb-2">30-Day States</strong>
                                Many states require registration roughly one month before the election (e.g., Texas, Florida, Ohio).
                            </li>
                            <li className="bg-gray-800 p-4 rounded-lg">
                                <strong className="block text-brand-gold text-lg mb-2">15-Day States</strong>
                                States like California and Pennsylvania have deadlines closer to the election (usually 15 days prior).
                            </li>
                            <li className="bg-gray-800 p-4 rounded-lg">
                                <strong className="block text-green-400 text-lg mb-2">Same-Day (SDR)</strong>
                                Over 20 states and DC allow you to register and vote on the same day, either during early voting or on Election Day itself.
                            </li>
                        </ul>

                        <h2 id="voter-id" className="text-3xl mt-12">5. The Landscape of Voter ID Laws</h2>
                        <p>When you head to the polls, you may be asked to show identification. This is a hotly debated topic, but knowing the law in your state is essential to ensuring your vote counts.</p>
                        <ul>
                            <li><strong>Strict Photo ID States:</strong> You must present a specific government-issued photo ID (e.g., Georgia, Indiana). If you don't have one, you may vote a provisional ballot and must return with ID later.</li>
                            <li><strong>Non-Strict Photo ID States:</strong> You are asked for photo ID, but if you don't have it, you can sign an affidavit confirming your identity (e.g., Idaho).</li>
                            <li><strong>No Document Required:</strong> In states like New York and California, you typically only verify your signature against the registration book.</li>
                        </ul>

                        <h2 id="myths" className="text-3xl mt-12">6. Debunking Common Voting Myths</h2>
                        <div className="grid gap-6 md:grid-cols-2 my-6">
                            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600">
                                <h4 className="font-bold text-red-400 mb-2 text-lg">Myth: My vote doesn't matter.</h4>
                                <p className="text-sm"><strong>Fact:</strong> In 2017, a Virginia House of Delegates race ended in a literal tie, decided by drawing a name from a bowl. Local elections are often decided by fewer than 50 votes.</p>
                            </div>
                            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600">
                                <h4 className="font-bold text-red-400 mb-2 text-lg">Myth: Registration leads to Jury Duty.</h4>
                                <p className="text-sm"><strong>Fact:</strong> Courts use DMV records and tax filings in addition to voter rolls. Avoiding voting does not hide you from jury service.</p>
                            </div>
                        </div>

                        <h2 id="integrity" className="text-3xl mt-12">7. Election Integrity & Security</h2>
                        <p>How do we know elections are secure? The US election system is decentralized, meaning it is actually thousands of independent systems, making widespread hacking nearly impossible.</p>
                        <p><strong>Paper Trails:</strong> Over 90% of votes in the US now have a verifiable paper record. This allows for post-election audits to confirm the electronic tally matches the physical ballots.</p>
                        <p><strong>Bipartisan Observers:</strong> In almost every precinct, trained poll watchers from both major parties observe the process to ensure fairness.</p>
                        <p><strong>Logic & Accuracy Testing:</strong> Before every election, voting machines are publicly tested to ensure they are counting correctly.</p>

                        <h2 id="faq" className="text-3xl mt-12">8. Frequently Asked Questions (FAQ)</h2>
                        <dl className="space-y-8 mt-6">
                            <div className="bg-gray-800/30 p-6 rounded-xl">
                                <dt className="font-bold text-xl text-brand-gold">I just moved. Do I need to re-register?</dt>
                                <dd className="mt-3 text-gray-300 leading-relaxed">Yes. Whenever you change your residential address—even within the same city—you must update your registration to ensure you are voting on the correct local ballot measures and representatives. Failure to update can lead to provisional ballot requirements.</dd>
                            </div>
                            <div className="bg-gray-800/30 p-6 rounded-xl">
                                <dt className="font-bold text-xl text-brand-gold">Can I vote if I am homeless?</dt>
                                <dd className="mt-3 text-gray-300 leading-relaxed">Yes. You do not need a traditional home to vote. You can usually register by describing the location where you sleep (a shelter, park, or street corner) and providing a mailing address where you can receive mail (like a shelter or PO Box).</dd>
                            </div>
                            <div className="bg-gray-800/30 p-6 rounded-xl">
                                <dt className="font-bold text-xl text-brand-gold">What is a Provisional Ballot?</dt>
                                <dd className="mt-3 text-gray-300 leading-relaxed">If there is a question about your eligibility at the polling place (e.g., your name isn't on the list), you have the right to cast a provisional ballot. Election officials will investigate your eligibility after the election, and if verified, your vote will count.</dd>
                            </div>
                            <div className="bg-gray-800/30 p-6 rounded-xl">
                                <dt className="font-bold text-xl text-brand-gold">How do I find my polling place?</dt>
                                <dd className="mt-3 text-gray-300 leading-relaxed">Your polling place is assigned based on your residential address. You can find it by using the lookup tool on your state's Secretary of State website or by using non-partisan tools like Vote.org.</dd>
                            </div>
                        </dl>
                    </article>

                    {/* Gradient Overlay for Collapsed State - Fades to dark blue/black */}
                    {!isExpanded && (
                        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/90 to-transparent z-10"></div>
                    )}
                </div>
                
                {/* Toggle Button */}
                <div className="mt-2 flex justify-center relative z-20">
                    <button
                        onClick={() => setIsExpanded(prev => !prev)}
                        className="group flex items-center gap-3 bg-white text-blue-900 hover:bg-brand-gold hover:text-gray-900 px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                        {isExpanded ? 'Collapse Article' : 'Read Full 3,500 Word Guide'}
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-500 ${isExpanded ? 'rotate-180' : 'group-hover:translate-y-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeoArticle;