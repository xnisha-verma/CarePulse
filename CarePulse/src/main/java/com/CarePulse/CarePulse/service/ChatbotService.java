package com.CarePulse.CarePulse.service;

import com.CarePulse.CarePulse.dto.ChatRequest;
import com.CarePulse.CarePulse.dto.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatbotService {

    @Value("${groq.api.key}")
    private String apiKey;

    private static final String GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
    
    private static final String SYSTEM_PROMPT = 
        "You are CarePulse AI Assistant.\n\n" +
        "Help users:\n" +
        "- browse doctors\n" +
        "- understand appointment booking\n" +
        "- explain platform features\n" +
        "- suggest specializations based on symptoms\n\n" +
        "Do not provide medical diagnosis.\n" +
        "Do not access private patient data.\n" +
        "Be concise and professional.\n" +
        "Use Markdown formatting. Use **bold text** to highlight important information like doctor specializations or key features. Use bullet points for lists.";

    private final RestTemplate restTemplate;

    public ChatbotService() {
        this.restTemplate = new RestTemplate();
    }

    public ChatResponse processChat(ChatRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "llama-3.3-70b-versatile"); // Using Groq's 70b model
        
        List<Map<String, String>> messages = new ArrayList<>();
        
        Map<String, String> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        systemMessage.put("content", SYSTEM_PROMPT);
        messages.add(systemMessage);
        
        Map<String, String> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", request.getMessage());
        messages.add(userMessage);

        requestBody.put("messages", messages);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(GROQ_API_URL, entity, Map.class);
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null && responseBody.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> messageMap = (Map<String, Object>) choices.get(0).get("message");
                    String replyContent = (String) messageMap.get("content");
                    return new ChatResponse(replyContent);
                }
            }
            return new ChatResponse("I'm sorry, I couldn't process that request at the moment.");
        } catch (Exception e) {
            e.printStackTrace();
            return new ChatResponse("I am currently offline or experiencing issues. Please try again later.");
        }
    }
}
