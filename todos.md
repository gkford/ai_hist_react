I want to change the relationship between transformations and the animation. I want to change the calculation of whole numbers to be much simpler - just comparing if the floor of the previous number differs from the floor of the new 
number and taking that amount as the whole number changes. But then I want each resource transformation to have an "unanimated whole icon resources" tracker. Whenever a whole number change occurs for a given resource, this should be tracked in 
this. When an animation occurs, each resource icon that is animated either inbound or outbound should be deducted. The tracker should differentiate between inbound and outbound.                                                                   

This should mean that icons are "saved up" and that outbound animations are also related to an inbound animation, and an inbound animation will be held back until there is an outbound one available.

