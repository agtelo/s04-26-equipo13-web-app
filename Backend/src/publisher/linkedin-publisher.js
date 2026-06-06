const axios = require('axios');

async function publishLinkedIn(content, accessToken, personId) {
    try {
        const response = await axios.post(
            'https://api.linkedin.com/v2/ugcPosts',
            {
                author: `urn:li:person:${personId}`,
                lifecycleState: 'PUBLISHED',
                specificContent: {
                    'com.linkedin.ugc.ShareContent': {
                        shareCommentary: {
                            text: content
                        },
                        shareMediaCategory: 'NONE'
                    }
                },
                visibility: {
                    'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'X-Restli-Protocol-Version': '2.0.0' // Required by LinkedIn API
                }
            }
        );

        return {
            id: response.data.id,
            url: `https://www.linkedin.com/feed/update/${response.data.id}`,
            success: true
        };
    } catch (error) {
        console.error('Error publishing to LinkedIn:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Failed to publish to LinkedIn');
    }
}

module.exports = { publishLinkedIn };
